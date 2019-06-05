import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz, Option, Question } from '../entities/quiz';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';
import { Gender } from '../entities/user';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  updateQuizGroup: FormGroup;
  quiz: Quiz;
  selected=-1;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private NgRedux: NgRedux<AppState>,
              private api: QuizApiService,
              private quizactions: QuizActions,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.NgRedux.select(state => state.quizzes).subscribe(res => {
      this.quiz = res.quizzes.find(quiz => quiz._id == id);
    });

    this.updateQuizGroup = this.fb.group({
      title: [this.quiz.title],
      questions: this.fb.array([])
    });

    let index = 0;
    this.quiz.questions.forEach(element => {
      const questions = this.updateQuizGroup.controls.questions as FormArray;
      questions.push(this.fb.group({
        title: [element.title],
        options: this.fb.array([])
      }));

      // @ts-ignore
      const options = questions.controls[index].controls.options as FormArray;

      this.quiz.questions[index].options.forEach(option => {
        options.push(this.fb.group({
          answer: [option.answer],
          correct: [option.correct]
        }));
      });
      index++;

    });

    console.log(this.updateQuizGroup)
  }


  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.updateQuizGroup.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    // console.log(options);
    questions.push(question);
  }

  createNewOption(questionIndex: number) {
    const option = this.createNewOptionGroup();
    const questions = this.updateQuizGroup.controls.questions as FormArray;
    // console.log(questions);
    const options = (<FormArray> questions.controls[questionIndex]).controls['options'] as FormArray;
    // console.log(options);
    options.push(option);
  }

  createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  updateQuiz() {
    const id = this.route.snapshot.paramMap.get('id');
    let quiz = this.updateQuizGroup.value as Quiz;
    quiz._id = id;
    console.log(quiz);
    // Call api and save quiz
    this.api.updateQuiz(quiz).subscribe(quizFromWs => {
      // Save quiz locally to redux with the quiz returned from WS (Includes the generated id)
      this.quizactions.updateQuiz(quizFromWs);
      this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      // Code to handle WS Error here
      console.log('Something went wrong: ' + error);
    });

  }

}