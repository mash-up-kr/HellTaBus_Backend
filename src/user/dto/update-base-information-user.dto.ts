import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {AudioCoach, Gender, SplitType, Speed} from '../../constants';

export class UpdateBaseUserInformationDto {
  @IsNotEmpty()
  @ApiProperty({example: '펭귄', description: '사용자 닉네임'})
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({example: 'FEMALE', description: '사용자 성별'})
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty({example: 25, description: '사용자 나이'})
  age: number;

  @IsNotEmpty()
  @ApiProperty({example: 158, description: '사용자 키'})
  height: number;

  @IsNotEmpty()
  @ApiProperty({example: 23, description: '사용자 몸무게'})
  weight: number;

  @IsNotEmpty()
  @ApiProperty({example: 'FULL_BODY_WORKOUT', description: '사용자 분할 선택'})
  splitType: SplitType;

  @IsNotEmpty()
  @ApiProperty({example: 'COMFORTABLE', description: '오디오 코치 선택'})
  audioCoach: AudioCoach;

  @IsNotEmpty()
  @ApiProperty({example: 'FAST', description: '어떤 속도로 운동'})
  speed: Speed;

  @IsNotEmpty()
  @ApiProperty({example: 1, description: '설명 필요 여부'})
  explanation: boolean;
}
