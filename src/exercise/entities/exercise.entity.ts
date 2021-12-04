import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ExercisePart} from '../../constants';
import {ExerciseHistory} from '../../exercise-history/entities/exercise-history.entity';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string; // 운동명

  @Column({
    type: 'enum',
    enum: ExercisePart,
  })
  part: ExercisePart; // 부위

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

  @Column({
    type: 'text',
  })
  what: string; // 어떤 운동인가요?

  @Column({
    type: 'text',
  })
  where: string; // 어느 부위가 운동되나요?

  @Column({
    type: 'text',
  })
  how: string; // 운동 방법을 알려주세요

  @Column({
    type: 'text',
  })
  caution: string; // 주의 사항이 있나요?

  /* Relations */

  @OneToMany(() => ExerciseHistory, exerciseHistory => exerciseHistory.exercise)
  exerciseHistoryList: ExerciseHistory[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
