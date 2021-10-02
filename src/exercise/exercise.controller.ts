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


@Controller('exercise')
@ApiTags('Exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) { }

  @Post()
  @ApiDocs.create('운동 목록 생성 API')
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }

  @Patch('/:id')
  @ApiDocs.update('운동 로직 수정')
  update(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('partList', new ParseArrayPipe({
      optional: true,
      items: String,
      separator: ',',
    }))
        partList: string[],
  ) {
    return this.exerciseService.findAll(
        req.id, partList
    );
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
