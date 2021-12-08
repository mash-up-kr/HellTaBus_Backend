import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ExercisePart} from 'src/constants';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '스쿼트', description: '운동 이름'})
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '우선 순위'})
  priority: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'CHEST', description: '운동 부위', enum: ExercisePart})
  part: ExercisePart;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '15', description: '한 세트에 운동할 기본 횟수'})
  baseCount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '3', description: '한 운동을 할 세트 수'})
  setCount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '0', description: '한 세트의 중량'})
  startWeight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '현재 무게에서 올릴 무게'})
  changeWeight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '120', description: '각 세트 사이에 쉬는 시간'})
  setBreakTime: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({example: '600', description: '한 운동을 끝나고 쉬는 시간'})
  breakTime: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'https://gif.helltabus.com/17601301/17601301-Dumbbell-Goblet-Squat_Thighs-FIX_1080.gif',
    description: '이미지 링크',
  })
  imageLink: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'data:image/webp;base64,UklGRroBAABXRU...',
    description: 'base64 인코딩 이미지 링크',
  })
  placeHolderImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'what: Squart는 쪼그리고 앉다는 뜻으로 데드리프트, 벤치프레스와 더불어...',
    description: '운동 설명(what, where, how, caution)',
  })
  description: string;
}
