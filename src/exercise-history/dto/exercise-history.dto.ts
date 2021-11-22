import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty, OmitType} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';
import {CreateFeedbackDto} from '../../feedback/dto/feedback-response.dto';

export class ExerciseHistoryResponseDto extends OmitType(
    CreateExerciseHistoryDto, ['difficulty'] as const) {
      @ApiProperty({type: [CreateFeedbackDto]})
      feedback: [CreateFeedbackDto];
}
