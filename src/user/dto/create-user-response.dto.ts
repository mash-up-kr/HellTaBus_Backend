import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {GoogleUserDto} from './google-user.dto';
import {CreateUserDto} from './create-user.dto';

export class CreateUserResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: CreateUserDto;
}
