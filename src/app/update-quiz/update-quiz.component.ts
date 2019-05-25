import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz, Option, Question } from '../entities/quiz';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quiz: Quiz;
  updateQuiz: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private ngRedux: NgRedux<AppState>, private fb: FormBuilder,private quizActions: QuizActions, private quizApi: QuizApiService) { }

  get questions() { return (this.updateQuiz.get('questions')) as FormArray; }
  get options () { return (this.updateQuiz.get(['questions', 'options'])) as FormArray;}
  

  

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id === id);
      console.log(result.quizzes)
    });

    console.log(this.quiz._id)
    console.log(this.quiz.questions)
   
    this.updateQuiz = this.fb.group({
      title: this.quiz.title,
      questions: this.fb.array([
        this.fb.group({
          title: "",
          options: this.fb.array([
           this.fb.group({
             answer: "",
             correct: false
           })
      ])
      }),
      
      
      ]),  
    })

    for( let i = 0; i < this.quiz.questions.length; i++){

      this.addProduct(this.quiz.questions[i])
      console.log((<FormArray>(this.questions.controls[i])).controls['options'])

      console.log(this.questions.controls[i].get('options'))
      this.quiz.questions[i].options.forEach(element => {
        console.log()
        console.log(this.options);
        
        })
      }
        
    
    this.questions.removeAt(0)
    console.log(this.updateQuiz)

  }



  addProduct(i: Question) {
    this.questions.push(this.fb.group({
      title: i.title,
      options: i.options
    }));
  }

  addOption(j: Option) {
    if(this.options){
      //console.log(j)
      //console.log(j.answer)
      let option: Option;
      option.answer = j.answer
      option.correct = j.correct
    this.options.push(this.fb.group({
      answer: j.answer, correct: j.correct
    }))
  }
}

  updateQuizSubmit() {
    let quizUpdate = this.updateQuiz.value as Quiz;

    this.quizApi.updateQuiz(this.quiz._id, quizUpdate).subscribe(updateTheQuiz => {
      console.log("updatethequiz: " + updateTheQuiz);
      this.quizActions.updateQuiz(updateTheQuiz, this.quiz._id);
      this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      console.log("something bad when updating the quiz happened", error);
    });

  }
}
