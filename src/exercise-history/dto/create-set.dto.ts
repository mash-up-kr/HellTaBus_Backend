import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateSetDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '세트 순서'})
  index: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '10', description: '세트 무게'})
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '세트 시작 시간'})
  startTime: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '세트 끝난 시간'})
  finishTime: Date;
}
