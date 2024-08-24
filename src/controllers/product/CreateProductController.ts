import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductServices";


class CreateProductController{
    async handle(req: Request, res:Response){
        const { name, price, description, category_id} = req.body

        const createProductservice = new CreateProductService();

        if(!req.file){
            throw new Error("error upload file")
        }else{

            const {originalname, filename: banner } = req.file;
            
            const product = await createProductservice.execute({
                name,
                price,
                description,
                banner,
                category_id
        });

        return res.json(product)
    }
}
}
export {CreateProductController}