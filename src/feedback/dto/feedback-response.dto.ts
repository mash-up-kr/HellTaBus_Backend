import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {FeedbackDifficulty} from '../../constants';

export class FeedbackResponseDto {
  @ApiProperty({example: '14'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: FeedbackDifficulty.EASY, enum: FeedbackDifficulty})
  difficulty: FeedbackDifficulty;
}
