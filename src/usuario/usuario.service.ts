import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Usuario } from "./usuario.model";
export interface userType {
    id: string;
    email: string;
    nome: string;
    senha: string;
    tipoConta: string;
}

@Injectable()
export class UsuarioService {
    private usuarios: Usuario[] = [];

    constructor(
        @InjectModel('User') private readonly usuarioModel:
            Model<Usuario>
    ) {}

    async createUser(email: string, senha: string, nome: string, tipoConta: string) {
        const novoUsuario = new this.usuarioModel({
            email: email,
            senha: senha,
            nome: nome,
            tipoConta: tipoConta
        });
        const resultado = await novoUsuario.save();
        return resultado.id as string;
    }

    async getAll() {
        const usuarios = await this.usuarioModel.find().exec();
        return usuarios.map((user) => ({
            id: user.id,
            email: user.email,
            senha: user.senha,
            nome: user.nome,
            tipoConta: user.tipoConta
        }));
    }

    async getById(id: string): Promise<userType> {
        const usuario = await this.findUser(id);
        return {
            id: usuario.id,
            email: usuario.email,
            senha: usuario.senha,
            nome: usuario.nome,
            tipoConta: usuario.tipoConta
        };
    }

    async getByEmail(email: string) {
        const usuario = await this.usuarioModel.findOne({ email: email }).exec();
        return {
            id: usuario.id,
            email: usuario.email,
            senha: usuario.senha,
            nome: usuario.nome,
            tipoConta: usuario.tipoConta
        };
    }

    async updateUser(id: string, email: string, senha: string, nome: string, tipoConta: string) {
        const atualizarUsuario = await this.findUser(id);
        if(email) {atualizarUsuario.email = email;}
        if(senha) {atualizarUsuario.senha = senha;}
        if(nome) {atualizarUsuario.nome = nome;}
        if(tipoConta) {atualizarUsuario.tipoConta = tipoConta;}
        atualizarUsuario.save();
    }

    async deleteUser(id: string) {
        await this.usuarioModel.deleteOne({_id: id}).exec();
    }

    private async findUser(id: string): Promise<Usuario> {
        let usuario;
        try {
            usuario = await this.usuarioModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse usuário!')
      }
      return usuario;
    }
}