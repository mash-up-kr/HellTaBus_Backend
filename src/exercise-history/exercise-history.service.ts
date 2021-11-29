import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';
import {ExerciseHistory} from './entities/exercise-history.entity';
import {User} from './../user/entities/user.entity';
import {Feedback} from './../feedback/entities/feedback.entity';
import {Set} from './entities/set.entity';
import {Exercise} from 'src/exercise/entities/exercise.entity';

@Injectable()
export class ExerciseHistoryService {
  constructor(
    @InjectRepository(ExerciseHistory)
    private readonly ExerciseHistoryRepository: Repository<ExerciseHistory>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Set)
    private readonly setRepository: Repository<Set>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) { }

  async create(userId: number, createExerciseHistoryDto: CreateExerciseHistoryDto) {
    const user = await this.userRepository.findOne({id: userId});
    if (!user) {
      throw Error(`Can't find user`);
    }
    const exercise = await this.exerciseRepository.findOne({
      id: createExerciseHistoryDto.id,
    });
    if (!exercise) {
      throw Error(`Can't find exercise`);
    }
    const feedback = await this.feedbackRepository.save({
      difficulty: createExerciseHistoryDto.difficulty,
      user,
    });
    const exerciseHistory = await this.ExerciseHistoryRepository.save({
      startTime: createExerciseHistoryDto.startTime,
      finishTime: createExerciseHistoryDto.finishTime,
      user,
      exercise,
      feedback,
    });
    for (const set of createExerciseHistoryDto.setList) {
      await this.setRepository.save({
        index: set.index,
        weight: set.weight,
        startTime: set.startTime,
        finishTime: set.finishTime,
        exerciseHistory,
      });
    }
    return createExerciseHistoryDto;
  }

  async findByPeriod(userId: number, from: string, to: string) {
    const user = await this.userRepository.findOne({id: userId});
    if (!user) {
      throw Error(`Can't find user`);
    }
    if (from === undefined) {
      from = '1800-01-01 00:00';
    }
    if (to === undefined) {
      to = '2800-01-01 00:00';
    }
    let exerciseHistoryList;
    exerciseHistoryList = await this.ExerciseHistoryRepository
        .createQueryBuilder('exerciseHistory')
        .innerJoinAndSelect('exerciseHistory.exercise', 'exercise')
        .innerJoinAndSelect('exerciseHistory.setList', 'setList')
        .andWhere('exerciseHistory.userId = :userId', {userId: user.id})
        .andWhere(`exerciseHistory.startTime 
          BETWEEN '${from}' AND '${to}'`)
        .getMany();

    exerciseHistoryList = exerciseHistoryList.filter(function(item) {
      return item !== null && item !== undefined && item !== '';
    });
    return exerciseHistoryList;
  }

  async findRecentExercise(exerciseIdList: number[], userId: number) {
    const user = await this.userRepository.findOne({id: userId});
    if (!user) {
      throw Error(`Can't find user`);
    }
    if (exerciseIdList === undefined) {
      exerciseIdList = [];
      const exerciseList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .select('id')
          .getRawMany();
      for (const exercise of exerciseList) {
        exerciseIdList.push(exercise.id);
      }
    }
    let exerciseHistoryList;
    exerciseHistoryList = await Promise.all(exerciseIdList.map(async (exerciseId) => {
      const exerciseHistorykEntity = await this.ExerciseHistoryRepository
          .createQueryBuilder('exerciseHistory')
          .innerJoinAndSelect('exerciseHistory.exercise', 'exercise')
          .innerJoinAndSelect('exerciseHistory.setList', 'setList')
          .innerJoinAndSelect('exerciseHistory.feedback', 'feedback')
          .where('exerciseHistory.exerciseId = :exerciseId', {exerciseId})
          .andWhere('exerciseHistory.userId = :userId', {userId: user.id})
          .orderBy('exerciseHistory.startTime', 'DESC')
          .getOne();
      return exerciseHistorykEntity;
    }));
    exerciseHistoryList = exerciseHistoryList.filter(function(item) {
      return item !== null && item !== undefined && item !== '';
    });
    return exerciseHistoryList;
  }
}
