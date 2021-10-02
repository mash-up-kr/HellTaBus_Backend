import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {HealthPart} from '../../constants';
import {Feedback} from '../../feedback/entities/feedback.entity';
import {ExerciseHistory} from '../../exercise-history/entities/exercise-history.entity';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string; // 운동명

  @Column({
    type: 'enum',
    enum: HealthPart,
  })
  part: HealthPart; // 부위

  @Column()
  baseCount: number; // 기본 횟수

  @Column()
  setCount: number; // 기본 세트 수

  @Column()
  startWeight: number; // 시작 중량

  @Column()
  changeWeight: number; // 증가 중량

  @Column()
  setBreakTime: number; // 세트마다의 쉬는시간

  @Column()
  breakTime: number; // 운동 마친 후 쉬는시간

  @Column()
  imageLink: string; // 운동 이미지 링크

  @Column()
  priority: number; // 우선순위

  /* Relations */

  @OneToMany(() => ExerciseHistory,
      (exerciseHistory) => exerciseHistory.exercise)
  exerciseHistoryList: ExerciseHistory[];

  @OneToMany(() => Feedback,
      (feedback) => feedback.exercise)
  feedbackList: Feedback[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
