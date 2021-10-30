import {Controller, Get, Post, Body, Patch, UseGuards, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiDocs} from './user.docs';
import {GoogleUserDto} from './dto/google-user.dto';
import {ApiTags} from '@nestjs/swagger';

import {JwtAuthGuard} from './jwt-auth.guard';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDocs.create('회원가입 API (Author by 소연)')
  create(@Body() googleUserDto: GoogleUserDto) {
    return this.userService.create(googleUserDto);
  }

  @Post('/login')
  @ApiDocs.login('로그인 API (Author by 소연)')
  async login(@Body() googleUserDto: GoogleUserDto) {
    return this.userService.login(googleUserDto);
  }

  @Get('/loginInfo')
  @ApiDocs.getLoginInfo('현재 로그인 사용자 정보 API (Author by 소연)')
  @UseGuards(JwtAuthGuard)
  async getLoginInfo(@Req() req) {
    return req.user;
  }

  // @Patch('my')
  // update(@Body() updateUserDto: UpdateUserDto) {
  //   const id = 1;
  //   return this.userService.update(+id, updateUserDto);
  // }
}
