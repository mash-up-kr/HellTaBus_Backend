import {Controller, Post, Body} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './dto/create-feedback.dto';
import {UpdateFeedbackDto} from './dto/update-feedback.dto';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './feedback.docs';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  @ApiDocs.create('피드백 생성 API')
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
