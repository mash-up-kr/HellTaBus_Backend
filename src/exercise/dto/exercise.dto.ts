import {CreateExerciseDto} from './create-exercise.dto';
import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ExerciseDto extends CreateExerciseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '고유 아이디'})
  id: number;
}
