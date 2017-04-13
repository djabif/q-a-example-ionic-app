import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

@Component({
  selector: 'manage-question-page',
  templateUrl: 'manage-question.html'
})
export class ManageQuestionPage {

  // questions: Array<any> = [];
  // _detail_slug : string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // let detail_slug_param = navParams.get('slug');
    // this._detail_slug = isPresent(detail_slug_param) ? detail_slug_param : '';
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
