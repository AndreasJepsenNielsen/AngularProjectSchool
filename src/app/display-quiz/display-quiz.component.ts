import { TempDataService } from './../service/temp-data.service';
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
  constructor(private tempData: TempDataService, private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    // this.quiz = this.tempData.getQuiz();
    

    // Get the id from the url
    let id = this.route.snapshot.paramMap.get('id');
    // Find the quiz object based on id
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id === id);
    });
    console.log(this.quiz)
    // Load the quiz in the html
  }

    onSelect(question: Question, option: Option) {
      question.options.forEach((x) => { if (x.answer !== option.answer) x.selected = false; });
      question.options.forEach((x) => { if (x.answer == option.answer) x.selected = true; });
    }
    
    isAnswered(question: Question) {
      return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
    };

    isCorrect(question: Question) {
      console.log(question.options.every(x => x.selected === x.correct) ? 'correct' : 'wrong')
      return question.options.every(x => x.selected === x.correct) ? 'correct' : 'wrong';
    };
  

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz._id, 'questionId': x.title, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';

  }



}
