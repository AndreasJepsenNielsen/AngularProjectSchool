import { QuizActions } from './../quiz.actions';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { AppState } from '../store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-display-quizzes',
  templateUrl: './display-quizzes.component.html',
  styleUrls: ['./display-quizzes.component.scss']
})
export class DisplayQuizzesComponent implements OnInit {
  quizzes: Quiz[];
  isLoading: boolean;
  
  constructor(private ngRedux: NgRedux<AppState>, private quizActions: QuizActions) { }

  ngOnInit() {
    // Subscribe to the redux store (quizzes).
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });

    this.quizActions.getQuizzes();
  }

  handleQuizClicked(quiz: Quiz) : void {
    console.log(quiz);
  }
}
