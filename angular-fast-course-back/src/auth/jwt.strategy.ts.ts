import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// import { Strategy } from 'passport-local'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { SECRET_KEY } from './constent'

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      // get JWT from Header 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY
    })
  }

  validate(payload: any): any {
    console.log('__GUARD_PAYLOAD ::: ', payload);
    return payload;
  }
}
