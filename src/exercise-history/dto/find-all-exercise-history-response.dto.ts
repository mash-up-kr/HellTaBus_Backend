import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ExerciseHistoryResponseDto} from './exercise-history.dto';

export class FindAllExerciseHistoryResponseDto extends BaseResponseDto {
  @ApiProperty({type: [ExerciseHistoryResponseDto]})
  data: [ExerciseHistoryResponseDto];
}
