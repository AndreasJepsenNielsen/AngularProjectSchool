import { Component, OnInit } from '@angular/core';
import { Quiz, Question, Option } from '../entities/quiz';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {
  quiz: Quiz;
  mode = 'quiz';
  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    // Get the id from the url
    let id = this.route.snapshot.paramMap.get('id');
    // Find the quiz object based on id
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id === id);
    });
  }

  onSelect(question: Question, option: Option) {
    question.options.forEach((x) => { if (x.answer !== option.answer) x.selected = false; });
    question.options.forEach((x) => { if (x.answer == option.answer) x.selected = true; });
  }
  
  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.correct) ? 'correct' : 'wrong';
  };
  
  onSubmit() {
    this.mode = 'result';
  }
}
