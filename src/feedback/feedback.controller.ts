import {Controller, Post, Body, Get, Query, ParseArrayPipe, Req} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './dto/create-feedback.dto';
import {User} from '../user/entities/user.entity';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './feedback.docs';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  @ApiDocs.create('피드백 생성 API')
  create(@Req() req: Request, @Body() createFeedbackDto: CreateFeedbackDto) {
    // TODO(sanghee): req.user 객체와 연동
    return this.feedbackService.create(new User(), createFeedbackDto);
  }

  @Get()
  @ApiDocs.findAll('피드백 다수 조회 API')
  findAll(@Query('exerciseIdList', new ParseArrayPipe({
    optional: true,
    items: String,
    separator: ',',
  }))
      exerciseIdList: string[],
  ) {
    // TODO(sanghee): req.user 객체와 연동
    return this.feedbackService.findAll(new User(), exerciseIdList);
  }
}
