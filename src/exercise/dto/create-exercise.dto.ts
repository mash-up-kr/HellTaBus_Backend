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
    example:
      'Squat는 쪼그리고 앉다는 뜻으로 데드리프트, 벤치프레스와 더불어 웨이트 트레이닝의 3대 운동 중 하나입니다....',
    description: '어떤 운동인가요?',
  })
  what: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '대퇴사두근, 둔근, 척주기립근, 복부 근육, 대퇴근 후면 근육이 집중적으로 운동됩니다...',
    description: '어느 부위가 운동되나요?',
  })
  where: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      '1. 앉았다 일어나는 동작을 기본으로 하는데 어깨너비로 발을 벌리고 서서 발가락이 전면을 향하도록 선 후,..',
    description: '운동 방법을 알려주세요.',
  })
  how: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '스쿼트는 분명히 프리 웨이트 중에서 최고의 운동효과를 낼 수 있는 운동입니다....',
    description: '주의 사항이 있나요?',
  })
  cautioin: string;
}
