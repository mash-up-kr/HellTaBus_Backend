import {
  Column,
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
  weight: number;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  /* Relations */

  @ManyToOne(() => ExerciseHistory,
      (exerciseHistory) => exerciseHistory.setList)
  exerciseHistory: ExerciseHistory;

  /* Date Columns */

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
