import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { QuestionPage } from '../pages/question/question';
// import { AnswerPage } from '../pages/answer/answer';
import { LearnFeedPage } from '../pages/learn-feed/learn-feed';
import { LearnDetailsPage } from '../pages/learn-details/learn-details';
import { QuestionDetailsPage } from '../pages/question-details/question-details';

import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';

import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../../sdk/index';

@NgModule({
  declarations: [
    MyApp,
    // QuestionPage,
    // AnswerPage,
    LearnFeedPage,
    LearnDetailsPage,
    QuestionDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // QuestionPage,
    // AnswerPage,
    LearnFeedPage,
    LearnDetailsPage,
    QuestionDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuestionService,
    AnswerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
