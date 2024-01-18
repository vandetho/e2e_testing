import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FeedbackService } from '../feedback.service';

@Command({
  name: 'create-feedback',
  description: 'Create an feedback',
  options: { isDefault: true },
})
export class CreateFeedbackCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly feedbackService: FeedbackService,
  ) {
    super();
  }

  async run(inputs: string[], options?: CreateFeedbackDto) {
    options = await this.inquirerService.ask(
      'create-feedback-questions',
      options,
    );
    await this.feedbackService.createFeedback(options);

    console.log(`Your feedback has been created`);
  }
}
