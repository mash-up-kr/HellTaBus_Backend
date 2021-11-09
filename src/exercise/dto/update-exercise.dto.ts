import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';
import {CreateExerciseDto} from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: '1', description: '고유 아이디'})
    id: number;
}
