import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {GoogleUserDto} from './google-user.dto';

export class LoginUserResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: GoogleUserDto;
}
