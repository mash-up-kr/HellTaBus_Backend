import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';
import {ExerciseHistory} from './entities/exercise-history.entity';
import {User} from './../user/entities/user.entity';

@Injectable()
export class ExerciseHistoryService {
  constructor(
    @InjectRepository(ExerciseHistory)
    private readonly ExerciseHistoryRepository: Repository<ExerciseHistory>
  ) { }

  async create(user: User, createExerciseHistoryDto: CreateExerciseHistoryDto) {
    
    return await this.ExerciseHistoryRepository.save(createExerciseHistoryDto);
  }

  async findAll(exerciseIdList: number[], user: User,
      duration: string, from: string, to: string) {
    let exerciseHistoryList;
    if (duration === 'recent') {
      exerciseHistoryList = await Promise.all(exerciseIdList.map(async (exerciseId) => {
        const exerciseHistorykEntity = await this.ExerciseHistoryRepository
            .createQueryBuilder('exerciseHistory')
            .innerJoinAndSelect('exerciseHistory.exercise', 'exercise')
            .innerJoinAndSelect('exerciseHistory.setList', 'setList')
            .innerJoinAndSelect('exerciseHistory.feedbackList', 'feedbackList')
            .where('exerciseHistory.exerciseId = :exerciseId', {exerciseId})
            .andWhere('exerciseHistory.userId = :userId', {userId: user.id})
            .orderBy('exerciseHistory.updatedAt', 'DESC')
            .getOne();
        return exerciseHistorykEntity;
      }));
    } else {
      exerciseHistoryList = await this.ExerciseHistoryRepository
          .createQueryBuilder('exerciseHistory')
          .innerJoinAndSelect('exerciseHistory.exercise', 'exercise')
          .innerJoinAndSelect('exerciseHistory.setList', 'setList')
          .innerJoinAndSelect('exerciseHistory.feedbackList', 'feedbackList')
          .where('exerciseHistory.exerciseId In (:exerciseIdList)', {exerciseIdList})
          .andWhere('exerciseHistory.userId = :userId', {userId: user.id})
          .andWhere(`exerciseHistory.startTime 
          BETWEEN '${from}' AND '${to}'`)
          .getMany();
    }
    return exerciseHistoryList;
  }
}
