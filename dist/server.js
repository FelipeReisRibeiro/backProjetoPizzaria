"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// conficuração para inicialização do app
const express_1 = __importDefault(require("express"));
// este deve ser sempre o segundo import
require("express-async-errors");
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // No maximo 50mb
}));
app.use(routes_1.router);
//Acessar url da imagem ex: localhost:3333/files/nome-imagem.png
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
//midleware para tratativa de erro
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //se for uma instancia do tipo error lance uma exeção 
        return res.status(400).json({
            error: err.message
        });
    }
    //se for algum outro tipo de erro.
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
//para inicializar na porta a ser utilizada - e a função de callback enviando a mensagem Servidor online
app.listen(process.env.PORT, () => console.log('Servidor online!!!'));
