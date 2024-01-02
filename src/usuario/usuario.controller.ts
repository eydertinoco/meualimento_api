import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NovoUsuarioDto} from "./dto/NovoUsuario.dto";

@Controller('/user')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async createUser(
        @Body('email') emailUsuario: string,
        @Body('senha') senhaUsuario: string,
        @Body('nome') nomeUsuario: string,
        @Body('tipoConta') tipoContaUsuario: string
    ){
        const generatedId = await this.usuarioService.createUser(
            emailUsuario,
            senhaUsuario,
            nomeUsuario,
            tipoContaUsuario
        );
        return { id: generatedId, status: 'Usuário Cadastrado'};
    }

    @Get()
    async getAllUser() {
        const usuarios = await this.usuarioService.getAll();
        return usuarios;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.usuarioService.getById(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') idUsuario: string,
        @Body('email') emailUsuario: string,
        @Body('senha') senhaUsuario: string,
        @Body('nome') nomeUsuario: string,
        @Body('tipoConta') tipoContaUsuario: string
    ) {
        await this.usuarioService.updateUser(
            idUsuario,
            emailUsuario,
            senhaUsuario,
            nomeUsuario,
            tipoContaUsuario
        );
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.usuarioService.deleteUser(userId);
        return null
    }
}