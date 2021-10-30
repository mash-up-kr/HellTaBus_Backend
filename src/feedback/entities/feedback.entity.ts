import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {FeedbackDifficulty} from '../../constants';
import {User} from '../../user/entities/user.entity';
import {Exercise} from '../../exercise/entities/exercise.entity';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: FeedbackDifficulty,
  })
  difficulty: FeedbackDifficulty;

  /* Relations */

  @ManyToOne(() => User, (user) => user.feedbackList, {nullable: false})
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.feedbackList, {nullable: false})
  exercise: Exercise;

  /* Date Columns */

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

