import {applyDecorators, Param} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {query} from 'express';
import {CreateExerciseDto} from './dto/create-exercise.dto';
import {UpdateExerciseDto} from './dto/update-exercise.dto';
import {ExerciseController} from './exercise.controller';
import {ExerciseDto} from './dto/exercise.dto';
import {FindSuggestionResponseDto} from './dto/find-suggestion-response.dto';
import {CreateExerciseResponseDto} from './dto/create-exercise-response.dto';
import {FindAllExerciseResponseDto} from './dto/find-all-exercise-response.dto';
import {UpdateExerciseResponseDto} from './dto/update-exercise-response.dto';

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
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
          type: CreateExerciseResponseDto,
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
              description: '조회하고 싶은 운동 부위 목록 (빈칸은 모든 운동 부위 목록으로 처리)',
              example: 'lower,back',
            },
        ),
        ApiResponse({
          status: 200,
          type: FindAllExerciseResponseDto,
          description: 'The record has been successfully searched.',
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
          status: 200,
          type: FindSuggestionResponseDto,
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
        ApiResponse({
          status: 200,
          type: UpdateExerciseResponseDto,
          description: '수정된 운동 로직의 모든 항목을 확인 할 수 있습니다.',
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
          status: 200,
          description: 'The record has been successfully deleted.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
