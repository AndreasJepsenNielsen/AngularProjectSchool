import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Quiz } from './entities/quiz';
import { QuizApiService } from './quiz-api.service';

@Injectable({ providedIn: 'root'})
export class QuizActions {
constructor (
  private ngRedux: NgRedux<AppState>, private api: QuizApiService) {} 
  
  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_QUIZ: string = 'CREATE_QUIZ'; 
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ'; 
  static DELETE_QUIZ: string = 'DELETE_QUIZ'; 

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';

  getQuizzes() : void {
    this.ngRedux.dispatch({ type: QuizActions.GET_QUIZZES_LOADING }); // starts a "spinner"

    this.api.getAllQuizzes().subscribe(quizzes => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'andr9')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });
  }

  deleteQuiz(quizId: string) : void  {
    this.ngRedux.dispatch({
      type: QuizActions.DELETE_QUIZ,
      payload: {quizId}
    })
  }

  createQuiz(quiz: Quiz) : void {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ,
      payload: quiz
    }); 
  }

  updateQuiz(quiz: Quiz) : void {
    this.ngRedux.dispatch({
      type: QuizActions.UPDATE_QUIZ,
      payload: {quiz}
    }); 
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    })

  }
}
