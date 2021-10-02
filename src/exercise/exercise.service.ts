import {Injectable} from '@nestjs/common';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {User} from '../user/entities/user.entity';
import * as dayjs from 'dayjs';
import {HealthPart, HealthStyle} from '../constants';
import {InjectRepository} from '@nestjs/typeorm';
import {Exercise} from './entities/exercise.entity';
import {Between, Repository} from 'typeorm';
import {ExerciseHistory} from '../exercise-history/entities/exercise-history.entity';

@Injectable()
export class ExerciseService {
  constructor(
      @InjectRepository(Exercise)
      private readonly exerciseRepository: Repository<Exercise>,
      @InjectRepository(ExerciseHistory)
      private readonly exerciseHistoryRepository: Repository<ExerciseHistory>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}

  create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  }

  findAll() {
    return `This action returns all exercise`;
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

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
