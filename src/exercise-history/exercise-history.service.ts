import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, CreateDateColumn, In, Repository} from 'typeorm';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';
import {UpdateExerciseHistoryDto} from './dto/update-exercise-history.dto';
import {ExerciseHistory} from './entities/exercise-history.entity';

@Injectable()
export class ExerciseHistoryService {
  constructor(
    @InjectRepository(ExerciseHistory)
    private readonly ExerciseHistoryRepository: Repository<ExerciseHistory>
  ) { }

  async create(createExerciseHistoryDto: CreateExerciseHistoryDto) {
    return await this.ExerciseHistoryRepository.save(createExerciseHistoryDto);
  }

  async findAll(exerciseIdList: number[], duration: string) {
    let start, end;
    if (duration === 'recent') {
      return await this.ExerciseHistoryRepository.findOne({
        where: {
          id: In(exerciseIdList),
        },
        order: {
          updatedAt: 'DESC',
        },
      });
    } else {
      return await this.ExerciseHistoryRepository.find({
        where: {
          updatedAt: Between(start, end)
          id: In(exerciseIdList),
        },
        order: {
          updatedAt: 'DESC',
        },
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseHistory`;
  }

  update(id: number, updateExerciseHistoryDto: UpdateExerciseHistoryDto) {
    return `This action updates a #${id} exerciseHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseHistory`;
  }
}
