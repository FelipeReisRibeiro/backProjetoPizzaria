import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
// verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect");
        }

// verificar se o email ja existe no banco
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExists){
            throw new Error("User already exists")
        }
        //comando para criptografafar o password inserido pelo usuario
        const passwordHash = await hash(password, 8)

        // criando o usuario no banco caso nao tenha dado nenhum dos erros a cima
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            //select para setar o que vai ser exibido na resposta neste caso para nao exibir o password
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export {CreateUserService} 