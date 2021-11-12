import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, Repository} from 'typeorm';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {User} from '../user/entities/user.entity';
import {HealthPart, SplitType, Split3DayWorkoutPart} from '../constants';
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

  async findAll(partList: string[]) {
    let exerciseList;
    if (partList.length === 0 || partList[0] === '') {
      exerciseList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .getMany();
    } else {
      if (partList.includes(HealthPart.ARM)) {
        partList.push(...[HealthPart.BICEPS, HealthPart.TRICEPS]);
      }
      exerciseList = await this.exerciseRepository
          .createQueryBuilder('exercise')
          .where('exercise.part In (:partList)', {partList})
          .getMany();
    }
    return exerciseList;
  }

  async getSuggestionExerciseListFromHistory(healthPart, exerciseHistoryList, number = 1) {
    const exerciseList = [];
    if (healthPart === HealthPart.ARM) {
      exerciseList.push(...(await this.exerciseRepository.find({
        where: [
          {part: HealthPart.BICEPS},
          {part: HealthPart.TRICEPS},
        ],
        order: {
          priority: 'ASC',
        },
      })));
    } else {
      exerciseList.push(...(await this.exerciseRepository.find({
        where: [
          {part: healthPart},
        ],
        order: {
          priority: 'ASC',
        },
      })));
    }

    interface ExerciseCountTable {
      [index: string]: {
        cnt: number;
        exercise: Exercise;
      };
    }

    const exerciseCountTable: ExerciseCountTable = {};
    for (const exercise of exerciseList) {
      exerciseCountTable[exercise.id] = {
        cnt: 0,
        exercise: exercise,
      };
    }

    for (const userExerciseHistory of exerciseHistoryList) {
      if (Object.keys(exerciseCountTable).includes(String(userExerciseHistory.exercise.id))) {
        exerciseCountTable[userExerciseHistory.exercise.id].cnt++;
      }
    }
    const sortedExerciseCountTable =
      Object.fromEntries(Object.entries(exerciseCountTable).
          sort(([, a], [, b]) => a.cnt - b.cnt));
    const suggestionExerciseList = [];
    for (let i = 0; i < number; i++) {
      if (!Object.values(sortedExerciseCountTable)[i]) {
        break;
      }
      suggestionExerciseList.push(Object.values(sortedExerciseCountTable)[i].exercise);
    }
    return suggestionExerciseList;
  }

  async getSuggestionExerciseFromHistory(healthPart, exerciseHistoryList) {
    const exerciseList = await this.exerciseRepository.find({
      where: {
        part: healthPart,
      },
      order: {
        priority: 'ASC',
      },
    });

    if (exerciseList.length == 0) {
      throw Error(`Can't find exercise (healthPart: ${healthPart})`);
    }

    const alreadyExercisedIdList = [];
    for (const exerciseHistory of exerciseHistoryList) {
      alreadyExercisedIdList.push(exerciseHistory.exercise.id);
    }

    for (const exercise of exerciseList) {
      if (!alreadyExercisedIdList.includes(exercise.id)) {
        return exercise;
      }
    }
    return exerciseList[0];
  }

  async findSuggestion(user: User, from: string, to: string) {
    if (!user) {
      throw Error(`Can't find user`); // TODO: Error code
    }

    if (!from || !to) {
      throw Error(`Need 'from' & 'to' query string`);
    }

    const healthStyle = SplitType.SPLIT_3_DAY_WORKOUT;
    const userExerciseHistoryList = await this.exerciseHistoryRepository.find({
      where: {
        startTime: Between(from, to),
      },
      order: {
        startTime: 'ASC',
      },
      relations: ['exercise'],
    });

    const suggestionPartList: HealthPart[] = [];
    const suggestionExerciseList: Exercise[] = [];

    if (user.splitType === SplitType.SPLIT_3_DAY_WORKOUT) {
      // 가장 적게한 3분할 파트 찾기
      const partSetCount = {
        [Split3DayWorkoutPart.BACK_AND_TRICEPS]: 0,
        [Split3DayWorkoutPart.CHEST_AND_BICEPS]: 0,
        [Split3DayWorkoutPart.LOWER_AND_SHOULDER]: 0,
      };
      for (const userExerciseHistory of userExerciseHistoryList) {
        if (userExerciseHistory.exercise.part === HealthPart.BACK ||
          userExerciseHistory.exercise.part === HealthPart.TRICEPS) {
          partSetCount[Split3DayWorkoutPart.BACK_AND_TRICEPS]++;
        } else if (userExerciseHistory.exercise.part === HealthPart.CHEST ||
          userExerciseHistory.exercise.part === HealthPart.BICEPS) {
          partSetCount[Split3DayWorkoutPart.CHEST_AND_BICEPS]++;
        } else if (userExerciseHistory.exercise.part === HealthPart.LOWER ||
          userExerciseHistory.exercise.part === HealthPart.SHOULDER) {
          partSetCount[Split3DayWorkoutPart.LOWER_AND_SHOULDER]++;
        } else {
          throw Error(`Unknown part (${userExerciseHistory.exercise.part})`);
        }
      }
      const sortedPartSetCount = Object.entries(partSetCount).
          sort(([, a], [, b]) => a - b).
          reduce((r, [k, v]) => ({...r, [k]: v}), {});

      const leastPartSet = Object.keys(sortedPartSetCount)[0];
      if (leastPartSet === Split3DayWorkoutPart.BACK_AND_TRICEPS) {
        suggestionPartList.push(...[HealthPart.BACK, HealthPart.TRICEPS]);
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.BACK, userExerciseHistoryList, 2)));
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.TRICEPS, userExerciseHistoryList, 2)));
      } else if (leastPartSet === Split3DayWorkoutPart.CHEST_AND_BICEPS) {
        suggestionPartList.push(...[HealthPart.CHEST, HealthPart.BICEPS]);
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.CHEST, userExerciseHistoryList, 2)));
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.BICEPS, userExerciseHistoryList, 2)));
      } else if (leastPartSet === Split3DayWorkoutPart.LOWER_AND_SHOULDER) {
        suggestionPartList.push(...[HealthPart.LOWER, HealthPart.SHOULDER]);
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.LOWER, userExerciseHistoryList, 2)));
        suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
            HealthPart.SHOULDER, userExerciseHistoryList, 2)));
      } else {
        throw Error(`Unknown leastPartSet (${leastPartSet})`);
      }
    } else if (user.splitType === SplitType.SPLIT_5_DAY_WORKOUT) {
      // 가장 적게한 부위 찾기
      const partCount = {
        [HealthPart.LOWER]: 0,
        [HealthPart.BACK]: 0,
        [HealthPart.CHEST]: 0,
        [HealthPart.ARM]: 0,
        [HealthPart.SHOULDER]: 0,
      };
      for (const userExerciseHistory of userExerciseHistoryList) {
        if (userExerciseHistory.exercise.part === HealthPart.BICEPS ||
          userExerciseHistory.exercise.part === HealthPart.TRICEPS) {
          partCount[HealthPart.ARM]++;
        } else {
          partCount[userExerciseHistory.exercise.part]++;
        }
      }
      const sortedPartCount = Object.entries(partCount).
          sort(([, a], [, b]) => a - b).
          reduce((r, [k, v]) => ({...r, [k]: v}), {});
      const leastHealthPart = HealthPart[Object.keys(sortedPartCount)[0]];
      suggestionPartList.push(leastHealthPart);

      // 가장 적게한 부위에서 운동 3개 추천
      suggestionExerciseList.push(...(await this.getSuggestionExerciseListFromHistory(
          leastHealthPart, userExerciseHistoryList, 3)));
    } else if (user.splitType === SplitType.FULL_BODY_WORKOUT) { // 무분할
      suggestionPartList.push(...[HealthPart.SHOULDER, HealthPart.ARM,
        HealthPart.CHEST, HealthPart.BACK, HealthPart.LOWER]);

      suggestionExerciseList.push(...[
        await this.getSuggestionExerciseFromHistory(
            HealthPart.SHOULDER, userExerciseHistoryList),
        await this.getSuggestionExerciseFromHistory(
            HealthPart.TRICEPS, userExerciseHistoryList),
        await this.getSuggestionExerciseFromHistory(
            HealthPart.CHEST, userExerciseHistoryList),
        await this.getSuggestionExerciseFromHistory(
            HealthPart.BACK, userExerciseHistoryList),
        await this.getSuggestionExerciseFromHistory(
            HealthPart.LOWER, userExerciseHistoryList),
      ]);
    } else {
      throw Error(`Invalid healthStyle!!!!! (${user.splitType})`);
    }
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
