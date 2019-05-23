import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz, Option, Question } from '../entities/quiz';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quiz: Quiz;
  updateQuiz: FormGroup;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>, private fb: FormBuilder,private quizActions: QuizActions) { }

  get questions() { return (this.updateQuiz.get('questions')) as FormArray; }
  get options() { return (this.updateQuiz.get(['questions', 'options']).value) as FormArray; }

  

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
      title: [this.quiz.title, Validators.required],
      questions: this.fb.array([
        this.fb.group({options: this.fb.array([
        ])})
      ]), 
      
    })

    for( let i = 0; i < this.quiz.questions.length; i++){

      this.addProduct(this.quiz.questions[i])

    }

    console.log(this.updateQuiz)


  }



  addProduct(i: Question) {
    this.questions.push(this.fb.group({
      title: i
    }));
  }

  addOption(j: Option) {
    this.options.push(this.fb.group({
      answer: j
    }))
  }


  









}