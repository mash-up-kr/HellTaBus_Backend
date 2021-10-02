import {Controller, Get, Post, Body, Query, ParseArrayPipe, Req} from '@nestjs/common';
import {ExerciseHistoryService} from './exercise-history.service';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';

@Controller('exercise-history')
export class ExerciseHistoryController {
  constructor(private readonly exerciseHistoryService: ExerciseHistoryService) { }

  @Post()
  create(@Body() createExerciseHistoryDto: CreateExerciseHistoryDto) {
    return this.exerciseHistoryService.create(createExerciseHistoryDto);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('exerciseIdList', new ParseArrayPipe({
      optional: true,
      items: Number,
      separator: ',',
    }))
        exerciseIdList: number[],
    @Query('duration') duration: string,
    @Query('from') from: string,
    @Query('to') to: string
  ) {
    return this.exerciseHistoryService.findAll(exerciseIdList, req.id, duration, from, to);
  }
}
