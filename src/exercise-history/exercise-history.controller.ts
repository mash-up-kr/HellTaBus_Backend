import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseHistoryService } from './exercise-history.service';
import { CreateExerciseHistoryDto } from './dto/create-exercise-history.dto';
import { UpdateExerciseHistoryDto } from './dto/update-exercise-history.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseHistoryDto: UpdateExerciseHistoryDto) {
    return this.exerciseHistoryService.update(+id, updateExerciseHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseHistoryService.remove(+id);
  }
}
