import {Controller, Post, Body} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './dto/create-feedback.dto';
import {UpdateFeedbackDto} from './dto/update-feedback.dto';
import {ApiTags} from '@nestjs/swagger';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
