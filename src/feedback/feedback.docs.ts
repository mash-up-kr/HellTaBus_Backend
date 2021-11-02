import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {FeedbackController} from './feedback.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<FeedbackController> = {
  // create(summary) {
  //   return applyDecorators(
  //       ApiOperation({
  //         summary,
  //       }),
  //       ApiResponse({
  //         status: 201,
  //         description: 'The record has been successfully created.',
  //       }),
  //   );
  // },
  // findAll(summary: string) {
  //   return applyDecorators(
  //       ApiOperation({
  //         summary,
  //       }),
  //       ApiQuery(
  //           {
  //             name: 'exerciseIdList',
  //             required: true,
  //             type: String,
  //             description: '조회하고 싶은 운동 목록',
  //             example: '1,2',
  //           },
  //       ),
  //       ApiResponse({
  //         status: 200,
  //       }),
  //   );
  // },
};
