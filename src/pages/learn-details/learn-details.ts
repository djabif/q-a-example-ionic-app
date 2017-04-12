import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

// import { AnswerPage } from '../answer/answer';
import { QuestionDetailsPage } from '../question-details/question-details';

@Component({
  selector: 'learn-details-page',
  templateUrl: 'learn-details.html'
})
export class LearnDetailsPage {

  questions: Array<any> = [];
  _detail_slug : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    let detail_slug_param = navParams.get('slug');
    this._detail_slug = isPresent(detail_slug_param) ? detail_slug_param : '';
  }

  ionViewWillEnter() {
   this.getQuestions();
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.questionService.getQuestions()
    .then(res => {
      this.questions = res;
      loading.dismiss();
    })
  }

  addQuestion(){
    let prompt = this.alertCtrl.create({
      title: 'Add Question',
      message: "Write the question you want to ask",
      inputs: [
        {
          name: 'question',
          placeholder: 'question'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.questionService.createQuestion(data)
            .then(res => {
              console.log(res);
              this.getQuestions();
            })
          }
        }
      ]
    });
    prompt.present();
  }

  delete(questionId){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete this question?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.questionService.deleteQuestion(questionId)
            .then(res => this.getQuestions());
            this.answerService.getAnswers(questionId)
            .then(answers => {
              for(let answer of answers){
                this.answerService.deleteAnswer(answer.id);
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  // addPositiveVote(question){
  //   question.positiveVotes += 1;
  //   this.questionService.updateQuestion(question)
  //   .then(res => this.getQuestions())
  // }
  //
  // addNegativeVote(question){
  //   question.negativeVotes += 1;
  //   this.questionService.updateQuestion(question)
  //   .then(res => this.getQuestions())
  // }

  openAnswers(question){
    this.navCtrl.push(QuestionDetailsPage, {
      id: question.id,
      text: question.question
    });
  }

}
