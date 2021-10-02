import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './exercise.docs';
import {Exercise} from './entities/exercise.entity';


@Controller('exercise')
@ApiTags('Exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

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
