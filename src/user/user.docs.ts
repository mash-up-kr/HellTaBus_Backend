import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {GoogleUserDto} from './dto/google-user.dto';
import {User} from './entities/user.entity';
import {CreateUserResponseDto} from './dto/create-user-response.dto';
import {LoginUserResponseDto} from './dto/login-user-response.dto';
import {GetLoginInfoResponseDto} from './dto/get-login-info-response.dto';
import {UserDto} from './dto/user.dto';

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
        ApiResponse({
          status: 201,
          type: CreateUserResponseDto,
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
        ApiResponse({
          status: 201,
          type: LoginUserResponseDto,
          description: '사용자 정상 로그인',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },

  getLoginInfo(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '현재 로그인한 사용자의 정보를 조회할 수 있습니다.',
        }),
        ApiResponse({
          status: 200,
          type: GetLoginInfoResponseDto,
          description: '정상 조회',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
