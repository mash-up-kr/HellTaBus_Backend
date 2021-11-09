import {ApiProperty} from '@nestjs/swagger';
import {ExerciseDto} from '../dto/exercise.dto';
import {BaseResponseDto} from '../../common/dto/base-response.dto';

export class FindAllExerciseResponseDto extends BaseResponseDto {
  @ApiProperty({type: [ExerciseDto]})
  data: [ExerciseDto];
}
