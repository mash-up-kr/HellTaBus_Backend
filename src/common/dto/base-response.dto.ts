import {ApiProperty} from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty({example: '', nullable: true})
  message: string;
}
