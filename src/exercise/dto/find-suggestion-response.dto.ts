import {ApiProperty} from '@nestjs/swagger';
import {HealthPart} from '../../constants';
import {ExerciseDto} from '../dto/exercise.dto';
import {BaseResponseDto} from '../../common/dto/base-response.dto';

export class SuggestionResponseDataDto {
  @ApiProperty({enum: HealthPart, type: [HealthPart], description: '부위 목록'})
  suggestionPartList: [HealthPart];

  @ApiProperty({type: [ExerciseDto], description: '운동 목록'})
  suggestionExerciseList: [ExerciseDto];
}

export class FindSuggestionResponseDto extends BaseResponseDto {
  constructor() {
    super();
  }

  @ApiProperty()
  data: SuggestionResponseDataDto;
}
