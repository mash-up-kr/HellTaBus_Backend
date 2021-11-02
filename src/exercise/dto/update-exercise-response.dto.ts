import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {UpdateExerciseDto} from './update-exercise.dto';

export class UpdateExerciseResponseDto extends BaseResponseDto {
  @ApiProperty({type: UpdateExerciseDto})
  data: UpdateExerciseDto;
}
