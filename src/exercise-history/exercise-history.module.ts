import {Module} from '@nestjs/common';
import {ExerciseHistoryService} from './exercise-history.service';
import {ExerciseHistoryController} from './exercise-history.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExerciseHistory} from './entities/exercise-history.entity';
import {Set} from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseHistory, Set])],
  controllers: [ExerciseHistoryController],
  providers: [ExerciseHistoryService],
})
export class ExerciseHistoryModule { }
