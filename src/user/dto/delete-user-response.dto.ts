import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {GoogleUserDto} from './google-user.dto';
import {CreateUserDto} from './create-user.dto';

export class DeleteUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty({example: '', nullable: true})
  message: string;

  @ApiProperty({example: 'Successfully deleted User 1', nullable: true})
  data: string;
}
