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
  findAll(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '운동 기록을 조회합니다. 최신 운동기록 조회는 duration를 사용해주세요. 기간내 운동기록 조회는 from, to를 사용해주세요.',
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
              description: 'exerciseIdList에 해당하는 운동 목록에 대해 최근에 운동한 기록을 조회합니다.',
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
          status: 200,
          type: FindAllExerciseHistoryResponseDto,
          description: 'The record has been successfully searched.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
