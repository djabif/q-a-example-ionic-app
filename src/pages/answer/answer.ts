import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { AnswerService } from '../../services/answer.service'
import { QuestionService } from '../../services/question.service'
import { QuestionPage } from '../question/question'


@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html'
})
export class AnswerPage {

  answers: Array<any> = [];
  question: any;
  questionId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
   this.question = this.navParams.get('text');
   this.questionId = this.navParams.get('id');
   this.getAnswers();
  }

  getAnswers(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.answerService.getAnswers(this.questionId)
    .then(res => {
      this.answers = res;
      loading.dismiss();
    })
  }

  addAnswer(){
    let prompt = this.alertCtrl.create({
      title: 'Add Answer',
      message: "Write the answer for the question",
      inputs: [
        {
          name: 'answer',
          placeholder: 'answer'
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
            data.questionId = this.questionId;
            this.answerService.createAnswer(data)
            .then(res => {
              console.log(res);
              this.getAnswers();
            })
          }
        }
      ]
    });
    prompt.present();
  }

  delete(answerId){
    let confirm = this.alertCtrl.create({
      title: 'Delete answer',
      message: 'Are you sure you want to delete this answer?',
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
            this.answerService.deleteAnswer(answerId)
            .then(res => this.getAnswers())
          }
        }
      ]
    });
    confirm.present();
  }

  addPositiveVote(answer){
    answer.positiveVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

  addNegativeVote(answer){
    answer.negativeVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

  edit(answer){
    let prompt = this.alertCtrl.create({
      title: 'Edit Answer',
      message: "Write the new answer for the question",
      inputs: [
        {
          name: 'answer',
          placeholder: 'answer'
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
          text: 'Change',
          handler: data => {
            answer.answer = data.answer;
            this.answerService.updateAnswer(answer)
            .then(res => {
              this.getAnswers();
            })
          }
        }
      ]
    });
    prompt.present();
  }

  showQuestionPage(){
    this.navCtrl.push(QuestionPage);
  }

}
