import {Module} from '@nestjs/common';
import {ExerciseHistoryService} from './exercise-history.service';
import {ExerciseHistoryController} from './exercise-history.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExerciseHistory} from './entities/exercise-history.entity';
import {Set} from './entities/set.entity';
import {Exercise} from 'src/exercise/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseHistory, Set, Exercise])],
  controllers: [ExerciseHistoryController],
  providers: [ExerciseHistoryService],
})
export class ExerciseHistoryModule { }
