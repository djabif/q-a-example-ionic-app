import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { QuestionApi, Question } from '../../sdk';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  constructor(
    private http: Http,
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

  updateQuestion(questionId, values){
    let data = new Question();
    data.question = values.question;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    return this.questionApi.updateAttributes<Question>(questionId, data)
    .toPromise()
  }

  createQuestion(values){
    let data = new Question();
    data.question = values.question;
    return this.questionApi.create<Question>(data)
    .toPromise()
  }
}
