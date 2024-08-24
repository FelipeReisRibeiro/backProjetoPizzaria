import prismaClient from "../../prisma";

class DetailsUserSrvice{
    async execute(user_id: string){
        // comando para buscar no banco o primeiro item com esse id
        const user = await prismaClient.user.findFirst({
            where:{
                id:user_id
            },
            // utilizando o select para definir as informaçoes que eu quero que sejam exibidas, se nao utilizar ele serao exibidas todas as informações
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        return user;

    }
}

export {DetailsUserSrvice}