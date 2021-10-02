import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository, Between} from 'typeorm';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {User} from '../user/entities/user.entity';
import * as dayjs from 'dayjs';
import {HealthPart, HealthStyle} from '../constants';
import {ExerciseHistory} from '../exercise-history/entities/exercise-history.entity';
import {Exercise} from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseHistory)
    private readonly exerciseHistoryRepository: Repository<ExerciseHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createExerciseDto: CreateExerciseDto) {
    return await this.exerciseRepository.save(createExerciseDto);
  }

  async findAll(userId: string, partList: string[]) {
    const exercise = new Exercise();

    exercise.feedbackList;
    if (partList[0] === '') {
      return await this.exerciseRepository.find({
        relations: ['feedback'],
      });
    } else {
      const exerciseList = await Promise.all(partList.map(async (part) => {
        const exerciseEntity = await this.exerciseRepository.findOne({
          where: {
            part,
          },
          relations: ['feedback'],
        });
        exerciseEntity.feedbackList.
        return exerciseEntity;
      }));
      return exerciseList;
    }
  }

  async findOne(id: number) {
    return await this.exerciseRepository.findOne({
      where: {
        id,
      },
      relations: ['feedback'],
    });
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
    return this.exerciseRepository.update(id, updateExerciseDto);
  }

  async remove(id: number) {
    await this.exerciseRepository.delete(id);
  }
}
