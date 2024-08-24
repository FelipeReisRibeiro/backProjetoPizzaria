import {Request, Response, response} from 'express'
import {CreateUserService} from '../../services/user/CreateUserSrvice'

class CreateUserController{
    async handle(req: Request, res: Response){
        //pega as informações do body e coloca no const
        const {name, email, password} = req.body;

        //instanciando o CreateUserService
        const createUserService = new CreateUserService();
        // espera a resposta do que foi insrido  armazena no banco utilizando o execute e ja retorna o que foi inserido
        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(user)
        }

}


export {CreateUserController}
