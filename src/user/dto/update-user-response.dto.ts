import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {UpdateUserDto} from './update-user.dto';

export class UpdateUserResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: UpdateUserDto;
}
