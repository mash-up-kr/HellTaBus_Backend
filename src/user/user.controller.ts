import {Controller, Get, Post, Body, Patch} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiDocs} from './user.docs';
import {GoogleUserDto} from './dto/google-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDocs.create('회원가입 API')
  create(@Body() googleUserDto: GoogleUserDto) {
    return this.userService.create(googleUserDto);
  }

  @Post('/login')
  @ApiDocs.create('로그인 API')
  async login(@Body() googleUserDto: GoogleUserDto) {
    return this.userService.login(googleUserDto);
  }
  //
  // @Get('my')
  // getMyInfo() {
  //   return null;
  // }
  //
  // @Patch('my')
  // update(@Body() updateUserDto: UpdateUserDto) {
  //   const id = 1;
  //   return this.userService.update(+id, updateUserDto);
  // }
}
