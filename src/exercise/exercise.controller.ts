import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query} from '@nestjs/common';
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
  findSuggestion(@Req() req, @Query('from') from: string,
      @Query('to') to: string) {
    return this.exerciseService.findSuggestion(req.user, from, to);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
