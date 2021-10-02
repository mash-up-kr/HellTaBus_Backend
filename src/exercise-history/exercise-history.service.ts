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

  async findAll(exerciseIdList: number[], userId: number,
      duration: string, from: string, to: string) {
    if (duration === 'recent') {
      const exerciseHistoryList = await Promise.all(exerciseIdList.map(async (exerciseId) => {
        const exerciseHistory = await this.ExerciseHistoryRepository.findOne({
          where: {
            id: exerciseId,
            userId,
          },
          order: {
            createdAt: 'DESC',
          },
        });
        return exerciseHistory;
      }));
      return exerciseHistoryList;
    } else {
      const exerciseHistoryList = await Promise.all(exerciseIdList.map(async (exerciseId) => {
        const exerciseHistory = await this.ExerciseHistoryRepository.findOne({
          where: {
            id: exerciseId,
            userId,
            startTime: Between(from, to),
          },
          select: ['createdAt'],
        });
        return exerciseHistory;
      }));
      return exerciseHistoryList;
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
