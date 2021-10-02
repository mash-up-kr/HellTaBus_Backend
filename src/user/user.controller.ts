import {Controller, Get, Post, Body, Patch} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login() {
    return null;
  }

  @Get('my')
  getMyInfo() {
    return null;
  }

  @Patch('my')
  update(@Body() updateUserDto: UpdateUserDto) {
    const id = 1;
    return this.userService.update(+id, updateUserDto);
  }
}
