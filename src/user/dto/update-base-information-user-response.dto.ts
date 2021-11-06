import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {UpdateBaseUserInformationDto} from './update-base-information-user.dto';

export class UpdateBaseUserInformationResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: UpdateBaseUserInformationDto;
}
