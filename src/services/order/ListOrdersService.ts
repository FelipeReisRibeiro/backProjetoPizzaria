import prismaClient from "../../prisma";

interface ListOrderRequest{
    order_id: string
}

class ListOrdersService{
    async execute(){
        const orders = await prismaClient.order.findMany({
            where:{
                draft:false,
                status: false,
            },
            orderBy:{
                created_at: 'desc'
            }
        })
        return orders;
    }
}

export {ListOrdersService}