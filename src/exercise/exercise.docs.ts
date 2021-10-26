import {applyDecorators, Param} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {ExerciseController} from './exercise.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ExerciseController> = {
  create(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '새로운 운동 로직을 생성합니다.',
        }),
        ApiCreatedResponse({
          description: '생성된 운동 로직의 모든 항목을 확인 할 수 있습니다.',
          type: CreateExerciseDto,
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
        ApiOperation({
          summary,
          description: '운동 로직을 조회합니다.',
        }),
        ApiQuery(
            {
              name: 'partList',
              required: true,
              type: String,
              description: '조회하고 싶은 운동 부위 목록',
              example: 'lower,back',
            },
        ),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  findSuggestion(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 운동 로직만 조회합니다.',
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  update(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 운동 로직을 수정합니다.',
        }),
        ApiCreatedResponse({
          description: '수정된 운동 로직의 모든 항목을 확인 할 수 있습니다.',
          type: UpdateExerciseDto,
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  remove(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 운동 로직을 삭제합니다.',
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
