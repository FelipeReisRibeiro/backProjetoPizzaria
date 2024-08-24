import {Request, Response} from 'express'
import { DetailsUserSrvice } from '../../services/user/DetailUserService'

class DetailsUserController{
    async handle(req: Request, res:Response){
       
        const user_id = req.user_id;
        
        const detailUserService = new DetailsUserSrvice
    
        const user = await detailUserService.execute(user_id);

        return res.json(user);
        
    }
}

export {DetailsUserController}