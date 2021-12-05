import {ApiProperty, OmitType} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';
import {ExerciseDto} from './../../exercise/dto/exercise.dto';
import {IsNumber, IsNotEmpty} from 'class-validator';
import {SetDto} from './set.dto';

export class FindByPeriodExerciseHistoryDto extends OmitType(CreateExerciseHistoryDto, [
  'difficulty',
] as const) {
  @ApiProperty({type: [ExerciseDto]})
  exercise: [ExerciseDto];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '운동 id 값'})
  exerciseId: number;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '운동 시작 시간'})
  startTime: Date;

  @IsNotEmpty()
  @ApiProperty({example: '2021-10-31T07:43Z', description: '운동 끝난 시간'})
  finishTime: Date;

  @IsNotEmpty()
  @ApiProperty({type: [SetDto], description: '세트 정보'})
  setList: SetDto[];
}
