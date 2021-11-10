import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {AudioCoach, Gender, HealthStyle, Speed} from '../../constants';
import {ExerciseHistory} from '../../exercise-history/entities/exercise-history.entity';
import {Feedback} from '../../feedback/entities/feedback.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '사용자의 id'})
  id: number;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    unique: true,
  })
  @ApiProperty({description: '사용자의 이메일'})
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  googleAccount: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    unsigned: true,
    nullable: true,
  })
  age: number;

  @Column({
    unsigned: true,
    nullable: true,
  })
  height: number;

  @Column({
    unsigned: true,
    nullable: true,
  })
  weight: number;

  @Column({
    type: 'enum',
    enum: HealthStyle,
    nullable: true,
  })
  healthStyle: HealthStyle;

  @Column({
    type: 'enum',
    enum: AudioCoach,
    nullable: true,
  })
  audioCoach: AudioCoach;

  @Column({
    type: 'enum',
    enum: Speed,
    nullable: true,
  })
  speed: Speed;

  @Column({
    type: 'boolean',
    nullable: true,
    default: 0,
  })
  explanation: boolean;

  /* Relations */

  @OneToMany(() => ExerciseHistory,
      (exerciseHistory) => exerciseHistory.user)
  exerciseHistoryList: ExerciseHistory[];

  @OneToMany(() => Feedback,
      (feedback) => feedback.user)
  feedbackList: Feedback[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

