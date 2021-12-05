import {Controller, Get, Post, Body, Patch, UseGuards, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiDocs} from './user.docs';
import {GoogleUserDto} from './dto/google-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import {JwtAuthGuard} from './jwt-auth.guard';
import {UpdateBaseUserInformationDto} from './dto/update-base-information-user.dto';

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

  @ApiBearerAuth()
  @Get('/login-info')
  @ApiDocs.getLoginInfo('현재 로그인 사용자 정보 API (Author by 소연)')
  @UseGuards(JwtAuthGuard)
  async getLoginInfo(@Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @Patch('/my/base-information')
  @ApiDocs.updateBaseUserInformation('회원가입 후 사용자 기본 정보 업데이트 API (Author by 소연)')
  @UseGuards(JwtAuthGuard)
  updateBaseUserInformation(
    @Req() req,
    @Body() updateBaseUserInformationDto: UpdateBaseUserInformationDto,
  ) {
    return this.userService.updateBaseUserInformation(req.user, updateBaseUserInformationDto);
  }

  @ApiBearerAuth()
  @Patch('/my')
  @ApiDocs.updateUser('사용자 정보 수정 API (Author by 소연)')
  @UseGuards(JwtAuthGuard)
  updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.user, updateUserDto);
  }
}
