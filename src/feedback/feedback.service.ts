import {Injectable} from '@nestjs/common';
import {CreateFeedbackDto} from './dto/feedback-response.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Feedback} from './entities/feedback.entity';
import {Repository} from 'typeorm';
import {User} from '../user/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Feedback)
    private readonly exerciseRepository: Repository<Feedback>,
  ) {}

  async create(user: User, createFeedbackDto: CreateFeedbackDto) {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id: createFeedbackDto.exerciseId,
      },
    });
    if (!exercise) {
      throw Error(`Can't find exercise (id: ${createFeedbackDto.exerciseId})`);
    }
    const feedback = await this.feedbackRepository.save({
      difficulty: createFeedbackDto.difficulty,
      user: user,
      exercise: exercise,
    });
    return feedback;
  }

  async findOne(user: User, exerciseId: string) {
    const feedback = await this.feedbackRepository.findOne({
      relations: ['user', 'exercise'],
      where: {
        user: {
          id: user.id,
        },
        exercise: {
          id: exerciseId,
        },
        order: {
          updatedAt: 'DESC',
        },
      },
    });
    return feedback;
  }

  async findAll(user: User, exerciseIdList: string[]) {
    const feedbackList = [];
    for (const exerciseId of exerciseIdList) {
      feedbackList.push(await this.findOne(user, exerciseId));
    }
    return feedbackList;
  }
}
