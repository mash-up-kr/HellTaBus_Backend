import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {UpdateUserDto} from './update-user.dto';

export class UpdateBaseUserInformationResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: UpdateUserDto;
}
