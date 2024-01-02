import {Injectable, Request} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from './constants';

export interface JWTPayloadRequest extends Request {
    usuario: {
        email: string;
        nome: string;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {email: payload.email, nome: payload.nome}
    }
}