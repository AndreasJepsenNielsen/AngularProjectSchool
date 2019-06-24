import { QuizApiService } from './../quiz-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Quiz } from '../entities/quiz';
import { Router } from '@angular/router';
import { Gender } from '../entities/user';
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;
  tempQuiz : Quiz[] = [];
  constructor(private fb: FormBuilder, 
    private router: Router, private quizActions: QuizActions, private quizApi: QuizApiService) { }

  saveQuiz() {  
    let quiz = this.createQuiz.value as Quiz;
    quiz.user = {  
      _id: '1', 
      username: 'QuizItUser', 
      email: 'quizIt@user.dk', 
      gender: Gender.MALE, 
      birthDate: undefined 
    };

    console.log("1");
    this.quizApi.createQuiz(quiz).subscribe(quizFromWs => {

      console.log("3");

      this.quizActions.createQuiz(quizFromWs);
      this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      console.log("something bad happened", error);
    });
    console.log("2");
  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());

    questions.push(question);
  }

  createNewOption(questionIndex: number){
    const option = this.createNewOptionGroup();
    const questions = this.createQuiz.controls.questions as FormArray;
    const options = (<FormArray>questions.controls[questionIndex]).controls['options'] as FormArray;

    options.push(option);
  }

  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
    })
  }
}
