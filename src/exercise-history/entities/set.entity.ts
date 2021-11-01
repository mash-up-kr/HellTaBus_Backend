import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ExerciseHistory} from './exercise-history.entity';

@Entity('set')
export class Set {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  index: number;

  @Column()
  weight: number; // 한 운동의 한 세트의 무게

  @Column()
  startTime: Date; // 한 운동의 한 세트 시작 시간

  @Column()
  finishTime: Date; // 한 운동의 한 세트 끝난 시간

  /* Relations */

  @ManyToOne(() => ExerciseHistory,
      (exerciseHistory) => exerciseHistory.setList, {nullable: false})
  exerciseHistory: ExerciseHistory;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
