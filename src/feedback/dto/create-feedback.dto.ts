import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {FeedbackDifficulty} from '../../constants';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @ApiProperty({example: FeedbackDifficulty.EASY, enum: FeedbackDifficulty})
  difficulty: FeedbackDifficulty;

  @IsNotEmpty()
  exerciseId: number;
}
