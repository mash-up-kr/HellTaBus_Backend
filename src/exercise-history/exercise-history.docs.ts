import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ExerciseHistoryController} from './exercise-history.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ExerciseHistoryController> = {
  create(summary) {
    return applyDecorators(
        ApiOperation({
          summary, // '운동 목록 생성 API',
          description: '새로운 운동 기록을 생성합니다.',
        }),
    );
  },
  findAll(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          /** '모든 사용자 조회' */ description: '운동 기록을 조회합니다.',
        }),
        ApiQuery(
            {
              name: 'exerciseIdList',
              required: true,
              type: String,
              description: '조회하고 싶은 운동 Id 목록',
              example: '1,2',
            },
        ),
        ApiQuery(
            {
              name: 'duration',
              required: false,
              description: '최근에 운동한 기록 조회',
              example: 'recent',
            },
        ),
        ApiQuery(
            {
              name: 'from',
              required: false,
              description: '조회하고 싶은 날짜의 시작',
              example: '2021-10-22 13:32',
            },
        ),
        ApiQuery(
            {
              name: 'to',
              required: false,
              description: '조회하고 싶은 날짜의 끝',
              example: '2021-10-24 13:32',
            },
        ),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
