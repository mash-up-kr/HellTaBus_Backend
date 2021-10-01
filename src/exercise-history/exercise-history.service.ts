import { Injectable } from '@nestjs/common';
import { CreateExerciseHistoryDto } from './dto/create-exercise-history.dto';
import { UpdateExerciseHistoryDto } from './dto/update-exercise-history.dto';

@Injectable()
export class ExerciseHistoryService {
  create(createExerciseHistoryDto: CreateExerciseHistoryDto) {
    return 'This action adds a new exerciseHistory';
  }

  findAll() {
    return `This action returns all exerciseHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseHistory`;
  }

  update(id: number, updateExerciseHistoryDto: UpdateExerciseHistoryDto) {
    return `This action updates a #${id} exerciseHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseHistory`;
  }
}
