import { TempDataService } from './../service/temp-data.service';
import { QuizActions } from './../quiz.actions';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizApiService } from '../quiz-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>(); 

  

  constructor(private quizApi: QuizApiService, private quizActions: QuizActions, private router: Router) { }

  ngOnInit() {
    
  }

  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

  deleteQuizClicked() {
    console.log(this.quizInput._id)

    this.quizApi.deleteQuiz(this.quizInput._id).subscribe(quizDeleted => {
      
      //console.log(this.actions.deleteQuiz(this.quizInput._id))
    
      
      console.log(quizDeleted);
      

    }, error => {
      // write some code for if the ws breaks.
      console.log("Something bad happened", error);

      // this.quizActions.createQuizFailed(error);
    });

    this.quizActions.deleteQuiz(this.quizInput._id);    
    
    

  }

  updateQuizClicked(id: string) {


    this.router.navigate(['portal/update-quiz/' + id])

    
  }

}
