// conficuração para inicialização do app
import express, {Request, Response, NextFunction} from 'express';
// este deve ser sempre o segundo import
import 'express-async-errors'; 
import { router } from './routes';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import path from 'path';


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024 } // No maximo 50mb
}))

app.use(router);

//Acessar url da imagem ex: localhost:3333/files/nome-imagem.png
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)
//midleware para tratativa de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        //se for uma instancia do tipo error lance uma exeção 
        return res.status(400).json({
            error: err.message
    })
    }
    //se for algum outro tipo de erro.
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

//para inicializar na porta a ser utilizada - e a função de callback enviando a mensagem Servidor online
app.listen(process.env.PORT,  () => console.log('Servidor online!!!'))