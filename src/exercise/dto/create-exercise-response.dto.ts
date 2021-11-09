import {ApiProperty} from '@nestjs/swagger';
import {ExerciseDto} from '../dto/exercise.dto';
import {BaseResponseDto} from '../../common/dto/base-response.dto';

export class CreateExerciseResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: ExerciseDto;
}
