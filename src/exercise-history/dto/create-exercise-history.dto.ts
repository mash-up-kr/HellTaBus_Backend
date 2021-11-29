import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';
import {FeedbackDifficulty} from 'src/constants';
import {CreateSetDto} from './create-set.dto';

export class CreateExerciseHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '운동 id 값'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '운동 시작 시간'})
  startTime: Date;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '운동 끝난 시간'})
  finishTime: Date;

  @IsNotEmpty()
  @ApiProperty({example: FeedbackDifficulty.EASY, enum: FeedbackDifficulty})
  difficulty: FeedbackDifficulty;

  @IsNotEmpty()
  @ApiProperty({type: [CreateSetDto], description: '세트 정보'})
  setList: CreateSetDto[];
}
