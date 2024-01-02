import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioSchema} from "./usuario.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UsuarioSchema}])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})

export class UsuarioModule {}