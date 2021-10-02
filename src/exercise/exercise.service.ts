import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {Exercise} from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}


  async create(createExerciseDto: CreateExerciseDto) {
    const createExercise = await this.exerciseRepository.save({
      name: createExerciseDto.name,
      priority: createExerciseDto.priority,
      part: createExerciseDto.part,
      baseCount: createExerciseDto.baseCount,
      setCount: createExerciseDto.setCount,
      startWeight: createExerciseDto.startWeight,
      changeWeight: createExerciseDto.changeWeight,
      setBreakTime: createExerciseDto.setBreakTime,
      breakTime: createExerciseDto.breakTime,
      imageLink: createExerciseDto.imageLink,
    });

    return createExercise;
  }

  findAll() {
    return `This action returns all exercise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    await this.exerciseRepository.update(id, updateExerciseDto);
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
