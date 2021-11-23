import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {FeedbackDifficulty} from '../../constants';

export class FindFeedbackDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: FeedbackDifficulty.EASY, enum: FeedbackDifficulty})
  difficulty: FeedbackDifficulty;
}
