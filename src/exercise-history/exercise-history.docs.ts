import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {CreateExerciseHistoryDto} from './dto/create-exercise-history.dto';
import {ExerciseHistoryController} from './exercise-history.controller';

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
        ApiCreatedResponse({
          description: '운동 기록 생성',
          type: CreateExerciseHistoryDto,
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  findAll(summary: string) {
    return applyDecorators(
        ApiResponse({status: 403, description: 'Forbidden.'}),
        ApiOperation({
          summary,
          /** '모든 사용자 조회' */ description: '모든 운동 로직을 조회합니다.',
        }),
    );
  },
};
