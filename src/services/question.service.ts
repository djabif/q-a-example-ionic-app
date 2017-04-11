import { Injectable } from '@angular/core';
import { QuestionApi, Question } from '../../sdk';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  constructor(
    private questionApi: QuestionApi
  ){}

  getQuestions(){
   return this.questionApi.find<Question>()
   .toPromise()
  }

  deleteQuestion(questionId){
    return this.questionApi.deleteById<Question>(questionId)
    .toPromise()
  }

  updateQuestion(values){
    let data = new Question();
    data.question = values.question;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    return this.questionApi.updateAttributes<Question>(values.id, data)
    .toPromise()
  }

  createQuestion(values){
    let data = new Question();
    data.question = values.question;
    return this.questionApi.create<Question>(data)
    .toPromise()
  }

}
