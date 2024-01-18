import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'create-feedback-questions' })
export class CreateFeedbackQuestion {
  @Question({
    message: 'What is your name ?',
    name: 'name',
  })
  parseName(val: string) {
    return val;
  }
  @Question({
    message: 'What is your contact information ?',
    name: 'contactInformation',
  })
  parseLastName(val: string) {
    return val;
  }

  @Question({
    message: 'What is feedback content ?',
    name: 'content',
  })
  parseContent(val: string) {
    return val;
  }
}
