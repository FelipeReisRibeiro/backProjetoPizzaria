"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se ele enviou um email
            if (!email) {
                throw new Error("Email incorrect");
            }
            // verificar se o email ja existe no banco
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            //comando para criptografafar o password inserido pelo usuario
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            // criando o usuario no banco caso nao tenha dado nenhum dos erros a cima
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash
                },
                //select para setar o que vai ser exibido na resposta neste caso para nao exibir o password
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
