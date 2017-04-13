import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

@Component({
  selector: 'manage-answer-page',
  templateUrl: 'manage-answer.html'
})
export class ManageAnswerPage {

  _mode : string;
  _question_id: string;
  _answer_id: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
