import {
  Controller, Get, Post, Body,
  Param, Delete, Req, Query, ParseArrayPipe, Patch,
} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './exercise.docs';
import {Exercise} from './entities/exercise.entity';
import {User} from './../user/entities/user.entity';


@Controller('exercise')
@ApiTags('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) { }

  @Post()
  @ApiDocs.create('운동 로직 생성 API')
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }

  @Patch('/:id')
  @ApiDocs.update('운동 로직 수정 API')
  update(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Get()
  @ApiDocs.findAll('운동 로직 조회 API (Author by 선우)')
  findAll(
    @Query('partList', new ParseArrayPipe({
      optional: true,
      items: String,
      separator: ',',
    }))
        partList: string[],
  ) {
    return this.exerciseService.findAll(partList);
  }

  @Get('suggestion')
  @ApiDocs.findSuggestion('추천 운동 조회 API')
  findSuggestion(@Req() req, @Query('from') from: string,
    @Query('to') to: string) {
    return this.exerciseService.findSuggestion(req.user, from, to);
  }

  @Delete(':id')
  @ApiDocs.remove('운동 로직 삭제 API')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
