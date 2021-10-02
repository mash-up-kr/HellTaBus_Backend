import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Err} from '../error';
import {Gender, HealthStyle} from '../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(req) {
    // TODO: req dto 생성
    const token = await this.jwtService.decode(req.idToken);

    const googleToken = JSON.parse(JSON.stringify(token));

    // TODO: expire 체크
    if (!googleToken) throw new BadRequestException(Err.TOKEN.INVALID);
    console.log(googleToken);
    const existingUser = await this.findUserBySub(googleToken.sub);

    if (existingUser) throw new BadRequestException(Err.USER.EXISTING_USER);

    if (!req.gender.includes(Gender)) {
      throw new BadRequestException(Err.USER.GENDER_INVALID);
    }

    if (!req.healthStyle.includes(HealthStyle)) {
      throw new BadRequestException(Err.USER.HEALTH_STYLE_INVALID);
    }

    const createdUser = await this.userRepository.save({
      email: googleToken.email,
      googleAccount: googleToken.sub,
      nickname: req.nickname,
      gender: req.gender,
      age: req.age,
      height: req.height,
      weight: req.weight,
      healthStyle: req.healthStyle,
    });

    return createdUser;
  }

  async findUserBySub(sub: string) {
    const user = await this.userRepository.findOne({
      where: {
        googleAccount: sub,
      },
    });

    return user;
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
