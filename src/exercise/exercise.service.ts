import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {Exercise} from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) { }

  async create(createExerciseDto: CreateExerciseDto) {
    return await this.exerciseRepository.save(createExerciseDto);
  }

  async findAll(partList: string[]) {
    if (partList[0] === '') {
      return await this.exerciseRepository.find({
        relations: ['feedback'],
      });
    } else {
      return await this.exerciseRepository.find({
        where: {
          part: In(partList),
        },
        relations: ['feedback'],
      });
    }
  }

  async findSuggestion() {
    return `This action returns suggestion`;
  }

  async findOne(id: number) {
    return await this.exerciseRepository.findOne({
      where: {
        id,
      },
      relations: ['feedback'],
    });
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseRepository.update(id, updateExerciseDto);
  }

  async remove(id: number) {
    await this.exerciseRepository.delete(id);
  }
}
