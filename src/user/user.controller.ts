import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiDocs} from './user.docs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDocs.create('회원가입 API')
  create(@Body() req) {
    return this.userService.create(req);
  }

  // @Post('login')
  // login(@Body req) {
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   }
  // }
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
