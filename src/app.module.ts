import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ExerciseModule} from './exercise/exercise.module';
import {UserModule} from './user/user.module';
import {ExerciseHistoryModule} from './exercise-history/exercise-history.module';
import {FeedbackModule} from './feedback/feedback.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconfig),
    ExerciseModule,
    UserModule,
    ExerciseHistoryModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
