import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class GoogleUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: '구글 sdk에서 발급하는 idToken'})
  idToken: string;
}
