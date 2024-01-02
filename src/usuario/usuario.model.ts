import * as mongoose from "mongoose";
export const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
    nome: { type: String, required: true },
    tipoConta: { type: String, required: true }
});
export interface Usuario extends mongoose.Document{
   id: string;
   email: string;
   senha: string;
   nome: string;
   tipoConta: string;
}