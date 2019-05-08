import { TempDataService } from './../service/temp-data.service';
import { QuizActions } from './../quiz.actions';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizApiService } from '../quiz-api.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>(); 

  

  constructor(private quizApi: QuizApiService, private actions: QuizActions, private temp: TempDataService) { }

  ngOnInit() {
    
  }

  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

  deleteQuizClicked() {
    
    this.quizApi.deleteQuiz(this.quizInput._id).subscribe(quizDeleted => {
    
      console.log(quizDeleted);
      

    }, error => {
      // write some code for if the ws breaks.
      console.log("Something bad happened", error);
      // this.quizActions.createQuizFailed(error);
    });

    this.actions.deleteQuiz(this.quizInput._id);
  }

  updateQuizClicked() {


    let quiz : Quiz

    quiz = this.temp.getQuiz()

    quiz._id = this.quizInput._id

    console.log(this.quizInput._id)

    this.quizApi.updateQuiz(quiz._id,quiz).subscribe(quizUpdated => {
      console.log(quizUpdated)
    }, error => {
      console.log("SOmething bad happened", error)
    })

    console.log("Updated" + this.quizInput)

  }

}
