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
import {ExtractJwt} from 'passport-jwt';
import {UpdateBaseUserInformationDto} from './dto/update-base-information-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user == null) {
      throw new NotFoundException(Err.USER.NOT_FOUND);
    }
    return user;
  }

  async create(googleUserDto: GoogleUserDto) {
    const payload = await verifyGoogle(googleUserDto.idToken);

    if (payload.email_verified !== true) {
      throw new BadRequestException(Err.USER.GOOGLE_EMAIL_NOT_VERIFIED);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{googleAccount: payload.sub}, {email: payload.email}],
    });

    if (existingUser) throw new BadRequestException(Err.USER.ALREADY_EXIST);

    const createdUser = await this.userRepository.save({
      email: payload.email,
      googleAccount: payload.sub,
    });

    const accessTokenData = {
      userId: createdUser.id,
      email: createdUser.email,
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
      id: createdUser.id,
      accessToken,
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
      email: user.email,
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

    let isPatched = 0;
    if (user.nickname !== null || user.speed !== null) {
      isPatched = 1;
    }

    return {
      accessToken,
      isPatched,
    };
  }

  async updateBaseUserInformation(
    user: User,
    {
      nickname,
      gender,
      age,
      height,
      weight,
      splitType,
      audioCoach,
      speed,
      explanation,
    }: UpdateBaseUserInformationDto,
  ) {
    const existingUser = await this.findOneById(user.id);

    existingUser.nickname = nickname;
    existingUser.gender = gender;
    existingUser.age = age;
    existingUser.height = height;
    existingUser.weight = weight;
    existingUser.splitType = splitType;
    existingUser.audioCoach = audioCoach;
    existingUser.speed = speed;
    existingUser.explanation = explanation;

    const updateUser = await this.userRepository.save(existingUser);
    return updateUser;
  }

  async updateUser(
    user: User,
    {nickname, age, height, weight, splitType, audioCoach, speed, explanation}: UpdateUserDto,
  ) {
    const existingUser = await this.findOneById(user.id);
    existingUser.nickname = nickname;
    existingUser.age = age;
    existingUser.height = height;
    existingUser.weight = weight;
    existingUser.splitType = splitType;
    existingUser.audioCoach = audioCoach;
    existingUser.speed = speed;
    existingUser.explanation = explanation;

    const updateUser = await this.userRepository.save(existingUser);
    return updateUser;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({id});
    if (!user) throw new NotFoundException(Err.USER.NOT_FOUND);
    await this.userRepository.delete(id);
    return `Successfully deleted User ${id}`;
  }
}
