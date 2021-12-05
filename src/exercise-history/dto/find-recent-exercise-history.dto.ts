import {ApiProperty, OmitType} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';
import {FindFeedbackDto} from '../../feedback/dto/find-feedback';
import {ExerciseDto} from './../../exercise/dto/exercise.dto';

export class FindRecentExerciseHistoryDto extends OmitType(CreateExerciseHistoryDto, [
  'difficulty',
] as const) {
  @ApiProperty({type: [ExerciseDto]})
  exercise: [ExerciseDto];

  @ApiProperty({type: [FindFeedbackDto]})
  feedback: [FindFeedbackDto];
}
