import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {GoogleUserDto} from './dto/google-user.dto';

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
          type: GoogleUserDto,
        }),
        ApiResponse({
          status: 201,
          description: '사용자 정상 생성',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },

  login(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '로그인을 진행합니다.',
        }),
        ApiCreatedResponse({
          description: '사용자 로그인',
          type: GoogleUserDto,
        }),
        ApiResponse({
          status: 201,
          description: '사용자 정상 로그인',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
