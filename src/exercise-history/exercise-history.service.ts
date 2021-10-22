import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {filter} from 'rxjs';
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
    const user = 1;
    let exerciseHistoryList;
    if (duration === 'recent') {
      exerciseHistoryList = await this.ExerciseHistoryRepository
          .createQueryBuilder('exerciseHistory')
          .leftJoinAndSelect('exerciseHistory.exercise', 'exercise')
          .leftJoinAndSelect('exerciseHistory.setList', 'setList')
          .where('exerciseHistory.exerciseId In (:exerciseIdList)', {exerciseIdList})
          .andWhere('exerciseHistory.userId = :userId', {userId})
          .andWhere('exerciseHistory.id = setList.exerciseHistoryId')
          .orderBy('exerciseHistory.updatedAt', 'DESC')
          .getRawOne();
    } else {
      exerciseHistoryList = await this.ExerciseHistoryRepository
          .createQueryBuilder('exerciseHistory')
          .leftJoinAndSelect('exerciseHistory.exercise', 'exercise')
          .leftJoinAndSelect('exerciseHistory.setList', 'setList')
          .where('exerciseHistory.exerciseId In (:exerciseIdList)', {exerciseIdList})
          .andWhere('exerciseHistory.userId = :userId', {userId})
          .andWhere('exerciseHistory.id = setList.exerciseHistoryId')
          .andWhere(`exerciseHistory.updatedAt 
          BETWEEN '${from}' AND '${to}'`)
          .getMany();
    }
    return exerciseHistoryList;
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
