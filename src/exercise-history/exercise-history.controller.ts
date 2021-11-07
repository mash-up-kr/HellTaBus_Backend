import {Controller, Get, Post, Body, Query, ParseArrayPipe, Req} from '@nestjs/common';
import {ExerciseHistoryService} from './exercise-history.service';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './exercise-history.docs';

@Controller('exercise-history')
@ApiTags('Exercise-history')
export class ExerciseHistoryController {
  constructor(private readonly exerciseHistoryService: ExerciseHistoryService) { }

  @ApiBearerAuth()
  @Post()
  @ApiDocs.create('운동 기록 생성 API (Author by 신영)')
  create(@Body() createExerciseHistoryDto: CreateExerciseHistoryDto) {
    return this.exerciseHistoryService.create(createExerciseHistoryDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiDocs.findAll('운동 기록 조회 API (Author by 선우)')
  findAll(
    @Req() req,
    @Query(
        'exerciseIdList',
        new ParseArrayPipe({
          optional: true,
          items: Number,
          separator: ',',
        }),
    )
        exerciseIdList: number[],
    @Query('duration') duration: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.exerciseHistoryService.findAll(exerciseIdList, req.user, duration, from, to);
  }
}
