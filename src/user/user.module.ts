import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {JwtModule} from '@nestjs/jwt';
import {JwtConstants} from '../auth/constant';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JwtConstants.SECRET,
      signOptions: {expiresIn: '2h'},
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule],
})
export class UserModule {}
