import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '123456', // mesmo segredo do AuthModule
    });
  }

  async validate(payload: any) {
    // Esse retorno será injetado em req.user
    return { id: payload.sub, usu_tel: payload.usu_tel };
  }
}
