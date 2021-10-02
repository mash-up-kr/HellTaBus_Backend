import {Module} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {ExerciseController} from './exercise.controller';
import {Exercise} from './entities/exercise.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {ExerciseHistory} from '../exercise-history/entities/exercise-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseHistory, User])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule { }
