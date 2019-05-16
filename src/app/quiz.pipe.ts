import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quizPipe' //Used when i apply the pipe
})
export class QuizPipe implements PipeTransform {

  transform(quizzes: any, search?: any): any {
    console.log(quizzes)
    console.log(search)

    if(search === undefined){
      return quizzes;
    }

    if(quizzes.filter(quiz=> quiz.title.indexOf(search) !== -1)){
    return quizzes.filter(quiz => quiz.title.indexOf(search) !== -1 )      
    }

    if(quizzes.filter(quiz=> quiz.user.username.indexOf(search) !== -1)){
      return quizzes.filter(quiz => quiz.user.username.indexOf(search) !== -1 )      
      }
    
  }

}
