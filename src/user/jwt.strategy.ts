import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {JwtConstants} from '../auth/constant';
import {UserService} from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.userId);
    if (!user) {
      throw Error(`Error while find user by JWT (payload: ${JSON.stringify(payload, null, 2)}`);
    }
    return user;
  }
}
