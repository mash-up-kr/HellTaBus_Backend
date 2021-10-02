import {PartialType} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './create-exercise-history.dto';

export class UpdateExerciseHistoryDto extends PartialType(CreateExerciseHistoryDto) {}
