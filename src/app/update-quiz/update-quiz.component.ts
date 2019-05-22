import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz } from '../entities/quiz';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quiz: Quiz;
  updateQuiz: FormGroup;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id === id);
      console.log(result.quizzes)
    });

    console.log(this.quiz._id)

    this.updateQuiz = this.fb.group({
      title: this.quiz.title,
      questions: this.quiz.questions,
      // question1: [''],  // We want a dynamic form and not this!
      // option1_1: [''],
      // option1_2: [''],
      // option1_3: [''],
      // question2: [''],
      // option2_1: [''], 
      // option2_2: [''], 
      // option2_3: [''], 
    })


  }



}
