import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Gender, HealthStyle} from '../../constants';

export class UpdateBaseUserInformationDto {
  @ApiProperty({example: '펭귄', description: '사용자 닉네임'})
  nickname: string;

  @ApiProperty({example: 'FEMALE', description: '사용자 성별'})
  gender: Gender;

  @ApiProperty({example: 25, description: '사용자 나이'})
  age: number;

  @ApiProperty({example: 158, description: '사용자 키'})
  height: number;

  @ApiProperty({example: 23, description: '사용자 몸무게'})
  weight: number;

  @ApiProperty({example: 'FULL_BODY_WORKOUT', description: '사용자 분할 선택'})
  healthStyle: HealthStyle;
}
