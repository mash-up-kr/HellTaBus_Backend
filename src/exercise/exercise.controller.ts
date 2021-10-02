import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, Query, ParseArrayPipe,
} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {CreateExerciseDto} from './dto/create-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) { }

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  findAll(
    @Query('partList', new ParseArrayPipe({
      optional: true,
      items: String,
      separator: ',',
    }))
    partList: string[],
  ) {
    return this.exerciseService.findAll(
      partList
    );
  }

  @Get('suggestion')
  findSuggestion() {
    return this.exerciseService.findSuggestion();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
