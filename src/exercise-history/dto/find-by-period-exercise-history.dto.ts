import {ApiProperty, OmitType} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';
import {ExerciseDto} from './../../exercise/dto/exercise.dto';

export class FindByPeriodExerciseHistoryDto extends OmitType(
    CreateExerciseHistoryDto, ['difficulty'] as const) {
      @ApiProperty({type: [ExerciseDto]})
      exercise: [ExerciseDto];
}
