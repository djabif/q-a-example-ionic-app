import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
// import { isPresent } from 'ionic-angular/util/util';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'manage-question-page',
  templateUrl: 'manage-question.html'
})
export class ManageQuestionPage {

  // questions: Array<any> = [];
  // _detail_slug : string;
  questionForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: QuestionService
  ) {
    // let detail_slug_param = navParams.get('slug');
    // this._detail_slug = isPresent(detail_slug_param) ? detail_slug_param : '';
  }

  ionViewWillLoad() {
    this.questionForm = new FormGroup({
      question: new FormControl('', Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmit(value){
    this.questionService.createQuestion(value.question)
    .then( res => this.dismiss() )
  }

}
