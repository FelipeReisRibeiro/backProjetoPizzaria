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
exports.DetailsUserSrvice = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailsUserSrvice {
    execute(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // comando para buscar no banco o primeiro item com esse id
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                },
                // utilizando o select para definir as informaçoes que eu quero que sejam exibidas, se nao utilizar ele serao exibidas todas as informações
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
exports.DetailsUserSrvice = DetailsUserSrvice;
