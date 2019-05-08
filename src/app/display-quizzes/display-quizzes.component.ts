import { TempDataService } from './../service/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { AppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { QuizApiService } from '../quiz-api.service';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-display-quizzes',
  templateUrl: './display-quizzes.component.html',
  styleUrls: ['./display-quizzes.component.scss']
})
export class DisplayQuizzesComponent implements OnInit {
  quizzes: Quiz[];

  constructor(private ngRedux: NgRedux<AppState>, private temp: TempDataService, private quizApi: QuizApiService) { }

  ngOnInit() {
    // Subscribe to the redux store (quizzes).
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = this.quizApi.createQuizzes();
    });
    // this.quizzes = this.data.quizzes;
    
    console.log("KIG HER",this.quizzes)
    this.temp.quizzes = this.quizzes
  }

  handleQuizClicked(quiz: Quiz) : void {
    // Do whatever I want to handle the event.
    
    console.log(quiz);
  }
}
