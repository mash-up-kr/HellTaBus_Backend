import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {CreateExerciseDto} from './dto/create-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get('suggestion')
  findSuggestion() {
    return this.exerciseService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
