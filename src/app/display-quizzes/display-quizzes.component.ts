import { QuizActions } from './../quiz.actions';
import { TempDataService } from './../service/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { AppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { QuizApiService } from '../quiz-api.service';

@Component({
  selector: 'app-display-quizzes',
  templateUrl: './display-quizzes.component.html',
  styleUrls: ['./display-quizzes.component.scss']
})
export class DisplayQuizzesComponent implements OnInit {
  quizzes: Quiz[];
  isLoading: boolean;
  

  constructor(private ngRedux: NgRedux<AppState>, private temp: TempDataService, private quizApi: QuizApiService,private quizActions: QuizActions) { }

  ngOnInit() {
    // Subscribe to the redux store (quizzes).
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });

    this.quizActions.getQuizzes();
    // this.quizzes = this.data.quizzes;
  }

  handleQuizClicked(quiz: Quiz) : void {
    // Do whatever I want to handle the event.
    
    console.log(quiz);
  }
}
