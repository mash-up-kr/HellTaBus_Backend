import {Injectable, Query} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository, Between, EntityManager} from 'typeorm';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {User} from '../user/entities/user.entity';
import * as dayjs from 'dayjs';
import {HealthPart, HealthStyle} from '../constants';
import {ExerciseHistory} from '../exercise-history/entities/exercise-history.entity';
import {Exercise} from './entities/exercise.entity';
import {Feedback} from './../feedback/entities/feedback.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseHistory)
    private readonly exerciseHistoryRepository: Repository<ExerciseHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) { }

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

  async findAll(userId: number, partList: string[]) {
    let exerciseList;
    let feedbackList;
    if (partList[0] === '') {
      exerciseList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .getMany();
      feedbackList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .innerJoinAndSelect('exercise.feedbackList', 'feedback')
          .where('feedback.userId = :userId', {userId})
          .getMany();
    } else {
      exerciseList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .where('exercise.part In (:partList)', {partList})
          .getMany();
      feedbackList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .innerJoinAndSelect('exercise.feedbackList', 'feedback')
          .where('feedback.userId = :userId', {userId})
          .andWhere('exercise.part In (:partList)', {partList})
          .getMany();
    }
    for (const idx in feedbackList) {
      if (feedbackList.hasOwnProperty(idx)) {
        Object.assign(exerciseList[idx], feedbackList[idx]);
      }
    }
    return exerciseList;
  }

  async findSuggestion(user: User, from: string, to: string) {
    // if (!user) {
    //   throw Error(`Can't find user`); // TODO: Error code
    // }
    //
    // if (!from || !to) {
    //   throw Error(`Need 'from' & 'to' query string`);
    // }

    const healthStyle = HealthStyle.SPLIT_3_DAY_WORKOUT;
    const userExerciseHistoryList = await this.exerciseHistoryRepository.find({
      where: {
        startTime: Between(from, to),
      },
      order: {
        startTime: 'ASC',
      },
      relations: ['exercise'],
    });

    const partCntTable = {};
    for (const userExerciseHistory of userExerciseHistoryList) {
      const date = dayjs(userExerciseHistory.startTime).format('YYYY-MM-DD');
      if (!partCntTable[date]) {
        partCntTable[date] = {};
      }
      if (!partCntTable[date][userExerciseHistory.exercise.part]) {
        partCntTable[date][userExerciseHistory.exercise.part] = 0;
      }
      partCntTable[date][userExerciseHistory.exercise.part]++;
    }

    const suggestionPartList: HealthPart[] = [];
    // if (user.healthStyle === HealthStyle.FULL_BODY_WORKOUT) {
    // } else if (user.healthStyle === HealthStyle.SPLIT_3_DAY_WORKOUT) {
    // } else if (user.healthStyle === HealthStyle.SPLIT_5_DAY_WORKOUT) {
    // } else {
    //   throw Error(`Invalid healthStyle (${healthStyle})`);
    // }

    const suggestionExerciseList: Exercise[] = [];

    suggestionPartList.push(...[HealthPart.SHOULDER, HealthPart.TRICEPS]);

    return {
      suggestionPartList,
      suggestionExerciseList,
    };
  }


  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    await this.exerciseRepository.update(id, updateExerciseDto);
    return `This action updates a #${id} exercise`;
  }

  async remove(id: number) {
    await this.exerciseRepository.delete(id);
  }
}
