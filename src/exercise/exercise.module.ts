import {Module} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {ExerciseController} from './exercise.controller';
<<<<<<< HEAD
import {Exercise} from './entities/exercise.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
=======
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {ExerciseHistory} from '../exercise-history/entities/exercise-history.entity';
import {Exercise} from './entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseHistory, User])],
>>>>>>> 0e3699afa7552cff75f75c6beae1a52ed22d2845
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule { }
