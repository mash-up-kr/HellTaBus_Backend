import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {FeedbackDifficulty} from '../../constants';
import {User} from '../../user/entities/user.entity';
import {ExerciseHistory} from '../../exercise-history/entities/exercise-history.entity';

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

  @ManyToOne(() => User, user => user.feedbackList, {nullable: false})
  user: User;

  @OneToOne(() => ExerciseHistory, exerciseHistory => exerciseHistory.feedback)
  exerciseHistory: ExerciseHistory;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
