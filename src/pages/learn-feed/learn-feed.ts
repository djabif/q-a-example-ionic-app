import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LearnDetailsPage } from '../learn-details/learn-details';

// @IonicPage()
@Component({
  selector: 'learn-feed-page',
  templateUrl: 'learn-feed.html',
})
export class LearnFeedPage {
  _query : string = 'all';
  categories : Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewWillEnter() {
    this.http.get("../../../../assets/categories/categories.json")
      .map((res:any) => res.json())
      .subscribe(data => this.categories = data.categories);
  }

  openDetails(params) {
    this.navCtrl.push(LearnDetailsPage, params);
  }

}
