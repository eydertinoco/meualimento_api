import {Injectable} from "@nestjs/common";
import {UsuarioService} from "../usuario/usuario.service";
import {JwtService} from "@nestjs/jwt";
const bcryptjs = require('bcrypt');
//
// export interface UserAuthProps {
//     email: string;
//     id: string;
// }

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
        ) {}

    async validateUser(emailUsuario: string, senhaUsuario: string) {
        // try {
        //     const user = await this.userService.getByEmail(userEmail);
        //     if (user) {
        //         const validadePass = await bcryptjs.compare(
        //             userPassword,
        //             user.password,
        //         );
        //         if (validadePass) {
        //             delete user.password;
        //             return {
        //                 email: user.email,
        //                 id: user.id,
        //             }
        //         }
        //     } else {
        //         throw new Error('Usuário não encontrado')
        //     }
        // } catch(err) {
        //     throw new Error(err);
        // }

        const usuario = await this.usuarioService.getByEmail(emailUsuario);
        if(usuario && usuario.senha === senhaUsuario) {
            const { id, email, nome } = usuario;
            return { id: id, email: email, nome: nome};
        }
        return null;
    }

    async login(usuario: any) {
        const payload = {email: usuario.email, sub: usuario.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}