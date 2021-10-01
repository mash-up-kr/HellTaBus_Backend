import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Gender, HealthStyle} from '../../constants';
import {ExerciseHistory} from '../../exercise-history/entities/exercise-history.entity';
import {Feedback} from '../../feedback/entities/feedback.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nickname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  googleAccount: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    unsigned: true,
  })
  age: number;

  @Column({
    unsigned: true,
  })
  height: number;

  @Column({
    unsigned: true,
  })
  weight: number;

  @Column({
    type: 'enum',
    enum: HealthStyle,
  })
  healthStyle: HealthStyle;

  /* Relations */

  @OneToMany(() => ExerciseHistory,
      exerciseHistory => exerciseHistory.user)
  exerciseHistoryList: ExerciseHistory[];

  @OneToMany(() => Feedback,
      feedback => feedback.user)
  feedbackList: Feedback[];

  /* Date Columns */

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

}

