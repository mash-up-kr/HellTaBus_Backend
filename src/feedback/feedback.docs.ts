import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {FeedbackController} from './feedback.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<FeedbackController> = {
  create(summary) {
    return applyDecorators(
        ApiOperation({
          summary, // '운동 목록 생성 API',
          description: '새로운 운동 로직을 생성합니다.',
        }),
        ApiCreatedResponse({
          description: '생성된 운동 로직의 모든 항목을 확인 할 수 있습니다.',
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
};
