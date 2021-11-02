import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from './user.dto';

export class GetLoginInfoResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: UserDto;
}
