import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class NovoUsuarioDto{

    @IsEmail(null, {message: 'O email informado é inválido'})
    email: string;

    @MinLength(6, {message: 'Senha precisa ter pelo menos 6 caracteres'})
    senha: string;

    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;
}