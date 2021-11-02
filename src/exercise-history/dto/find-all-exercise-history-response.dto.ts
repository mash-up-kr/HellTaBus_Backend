import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ExerciseHistoryDto} from './exercise-history.dto';

export class FindAllExerciseHistoryResponseDto extends BaseResponseDto {
  @ApiProperty({type: [ExerciseHistoryDto]})
  data: [ExerciseHistoryDto];
}
