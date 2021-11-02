import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';

export class ExerciseHistoryDto extends CreateExerciseHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '고유 아이디'})
  id: number;
}
