import {Response, Request} from  'express'
import { ListCategoryService } from '../../services/category/ListCategoryService'

class ListCategoryController{
    async handle(req: Request, res:Response){
        
        const listeCategoryService = new ListCategoryService();

        const category = await listeCategoryService.execute();
        
        return res.json(category);
    }
}

export {ListCategoryController}