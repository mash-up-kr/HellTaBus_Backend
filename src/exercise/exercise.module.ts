import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService]
})
export class ExerciseModule {}
