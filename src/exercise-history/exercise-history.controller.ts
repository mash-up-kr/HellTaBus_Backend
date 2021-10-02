import {Controller, Get, Post, Body} from '@nestjs/common';
import {ExerciseHistoryService} from './exercise-history.service';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';

@Controller('exercise-history')
export class ExerciseHistoryController {
  constructor(private readonly exerciseHistoryService: ExerciseHistoryService) {}

  @Post()
  create(@Body() createExerciseHistoryDto: CreateExerciseHistoryDto) {
    return this.exerciseHistoryService.create(createExerciseHistoryDto);
  }

  @Get()
  findAll() {
    return this.exerciseHistoryService.findAll();
  }
}
