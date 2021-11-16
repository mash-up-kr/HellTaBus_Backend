import {ApiProperty} from '@nestjs/swagger';
import {AudioCoach, SplitType, Speed} from '../../constants';
import {IsBoolean, IsEnum, IsNumber, IsString} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({example: '펭귄', description: '사용자 닉네임'})
  @IsString()
  nickname: string;

  @ApiProperty({example: 25, description: '사용자 나이'})
  @IsNumber()
  age: number;

  @ApiProperty({example: 158, description: '사용자 키'})
  @IsNumber()
  height: number;

  @ApiProperty({example: 23, description: '사용자 몸무게'})
  @IsNumber()
  weight: number;

  @ApiProperty({example: 'FULL_BODY_WORKOUT', description: '사용자 분할 선택', enum: SplitType})
  @IsEnum(SplitType)
  splitType: SplitType;

  @ApiProperty({example: 'COMFORTABLE', description: '오디오 코치 선택', enum: AudioCoach})
  @IsEnum(AudioCoach)
  audioCoach: AudioCoach;

  @ApiProperty({example: 'FAST', description: '어떤 속도로 운동', enum: Speed})
  @IsEnum(Speed)
  speed: Speed;

  @ApiProperty({example: 1, description: '설명 필요 여부'})
  @IsBoolean()
  explanation: boolean;
}
