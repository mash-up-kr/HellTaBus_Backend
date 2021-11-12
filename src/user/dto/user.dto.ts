import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Gender, SplitType} from '../../constants';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  nickname: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  googleAccount: string;

  @IsNotEmpty()
  @ApiProperty({enum: Gender})
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @ApiProperty({enum: SplitType})
  splitType: SplitType;
}
