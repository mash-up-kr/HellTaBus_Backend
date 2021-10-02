import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Err} from '../error';
import verifyGoogle from './util/google';
import {GoogleUserDto} from './dto/google-user.dto';
import {JwtSignOptions} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(googleUserDto: GoogleUserDto) {
    const payload = await verifyGoogle(googleUserDto.idToken);

    if (payload.email_verified !== true) {
      throw new BadRequestException(Err.USER.GOOGLE_EMAIL_NOT_VERIFIED);
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        {googleAccount: payload.sub},
        {email: payload.email},
      ],
    });

    if (existingUser) throw new BadRequestException(Err.USER.ALREADY_EXIST);

    const createdUser = await this.userRepository.save({
      email: payload.email,
      googleAccount: payload.sub,
    });

    return {
      id: createdUser.id,
    };
  }

  async login(googleUserDto: GoogleUserDto) {
    const payload = await verifyGoogle(googleUserDto.idToken);

    if (payload.email_verified !== true) {
      throw new BadRequestException(Err.USER.GOOGLE_EMAIL_NOT_VERIFIED);
    }

    const googleAccount = payload.sub;

    const user = await this.userRepository.findOne({
      where: {googleAccount},
    });

    if (!user) throw new NotFoundException(Err.USER.NOT_FOUND);

    const accessTokenData = {
      userId: user.id,
    };

    let accessToken;
    try {
      const options: JwtSignOptions = {
        algorithm: 'HS512',
        expiresIn: '100d',
        issuer: 'helltabus',
      };
      accessToken = this.jwtService.sign(accessTokenData, options);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }

    return {
      accessToken,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
