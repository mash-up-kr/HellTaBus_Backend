import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';

export class CreateExerciseHistoryResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: CreateExerciseHistoryDto;
}
