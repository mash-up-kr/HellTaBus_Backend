import {ExerciseController} from '../exercise/exercise.controller';
import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {User} from './entities/user.entity';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UserController> = {
  create(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '회원가입을 진행합니다.',
        }),
        ApiCreatedResponse({
          description: '사용자 생성',
          type: User,
        }),
        ApiResponse({
          status: 201,
          description: '사용자 정상 생성',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};