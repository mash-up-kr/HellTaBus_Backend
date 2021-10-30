import {Module} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {FeedbackController} from './feedback.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Feedback} from './entities/feedback.entity';
import {Exercise} from '../exercise/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Exercise])],
  controllers: [FeedbackController],
  providers: [FeedbackService],

})
export class FeedbackModule {}
