import {Module} from '@nestjs/common';
import {ExerciseService} from './exercise.service';
import {ExerciseController} from './exercise.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Exercise} from './entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
