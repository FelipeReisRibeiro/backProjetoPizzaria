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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserSrvice_1 = require("../../services/user/CreateUserSrvice");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pega as informações do body e coloca no const
            const { name, email, password } = req.body;
            //instanciando o CreateUserService
            const createUserService = new CreateUserSrvice_1.CreateUserService();
            // espera a resposta do que foi insrido  armazena no banco utilizando o execute e ja retorna o que foi inserido
            const user = yield createUserService.execute({
                name,
                email,
                password
            });
            return res.json(user);
        });
    }
}
exports.CreateUserController = CreateUserController;
