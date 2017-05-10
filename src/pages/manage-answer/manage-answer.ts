import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { AnswerService } from '../../services/answer.service';


@Component({
  selector: 'manage-answer-page',
  templateUrl: 'manage-answer.html'
})
export class ManageAnswerPage {

  _mode : string;
  _question_id: string;
  _answer_id: string;
  answerForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public answerService: AnswerService
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
  }

  ionViewWillLoad() {
    this.answerForm = new FormGroup({
      answer: new FormControl('', Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmit(value){
    this.answerService.createAnswer(value.answer)
    .then( res => this.dismiss() )
  }

}
