import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Exercise} from '../../exercise/entities/exercise.entity';
import {Set} from './set.entity';
import {Feedback} from '../../feedback/entities/feedback.entity';

@Entity('exercise-history')
export class ExerciseHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  startTime!: Date;

  @Column()
  finishTime!: Date;

  /* Relations */

  @ManyToOne(() => User, user => user.exerciseHistoryList)
  user!: User;

  @ManyToOne(() => Exercise, exercise => exercise.exerciseHistoryList)
  exercise: Exercise;

  @OneToMany(() => Set, set => set.exerciseHistory)
  setList: Set[];

  @OneToOne(() => Feedback, feedback => feedback.exerciseHistory, {nullable: true})
  @JoinColumn()
  feedback: Feedback;

  /* Date Columns */

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
