import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LearnDetailsPage } from '../learn-details/learn-details';

// @IonicPage()
@Component({
  selector: 'learn-feed-page',
  templateUrl: 'learn-feed.html',
})
export class LearnFeedPage {
  _query : string = 'all';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearnFeedPage');
  }

  openDetails() {
    this.navCtrl.push(LearnDetailsPage);
  }

}
