import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ExerciseHistoryController} from './exercise-history.controller';
import {CreateExerciseHistoryResponseDto} from './dto/create-exercise-history-response.dto';
import {FindAllExerciseHistoryResponseDto} from './dto/find-all-exercise-history-response.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ExerciseHistoryController> = {
  create(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '운동 기록을 생성하는 API 입니다.',
        }),
        ApiResponse({
          status: 201,
          type: CreateExerciseHistoryResponseDto,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  findByPeriod(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '기간내 운동 기록을 조회합니다. 운동과 세트 정보를 반환합니다.',
        }),
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
          status: 200,
          type: FindAllExerciseHistoryResponseDto,
          description: 'The record has been successfully searched.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  findRecentExercise(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: 'ID에 해당하는 최신 운동 기록을 조회합니다. 운동, 세트, 피드백 정보를 반환합니다.',
        }),
        ApiQuery(
            {
              name: 'exerciseIdList',
              required: false,
              type: String,
              description: '조회하고 싶은 운동 Id 목록 (입력하지 않을 시 모든 운동 Id를 조회)',
              example: '1,2',
            },
        ),
        ApiResponse({
          status: 200,
          type: FindAllExerciseHistoryResponseDto,
          description: 'The record has been successfully searched.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
