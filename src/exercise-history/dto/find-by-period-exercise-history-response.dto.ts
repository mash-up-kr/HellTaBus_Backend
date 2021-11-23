import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {FindByPeriodExerciseHistoryDto} from './find-by-period-exercise-history.dto';

export class FindByPeriodExerciseHistoryResponseDto extends BaseResponseDto {
  @ApiProperty({type: [FindByPeriodExerciseHistoryDto]})
  data: [FindByPeriodExerciseHistoryDto];
}
