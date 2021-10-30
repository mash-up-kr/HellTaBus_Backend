import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

export class CreateExerciseHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '사용자 id 값'})
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '운동 id 값'})
  exerciseId: number;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-28 12:23:34', description: '운동 시작 시간'})
  startTime: Date;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-28 13:14:56', description: '운동 끝난 시간'})
  finishTime: Date;
}
