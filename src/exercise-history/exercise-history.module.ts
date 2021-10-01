import { Module } from '@nestjs/common';
import { ExerciseHistoryService } from './exercise-history.service';
import { ExerciseHistoryController } from './exercise-history.controller';

@Module({
  controllers: [ExerciseHistoryController],
  providers: [ExerciseHistoryService]
})
export class ExerciseHistoryModule {}
