import { Injectable } from '@angular/core';
import { Quiz } from './entities/quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';
  

  constructor(private http: HttpClient) {}
  
  createQuiz(quiz: Quiz) : Observable<any> {
    return this.http.post(this.baseUrl, quiz);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl)
  }

  updateQuiz(quiz: Quiz) : Observable<any> {
    return undefined;//this.http.put<Quiz>();
  }

  deleteQuiz(id: string) : Observable<any> {
    return undefined;
  }

  getQuiz(quiz: Quiz) : Quiz {
    return { 
      _id: quiz._id, visible: quiz.visible, user: quiz.user, title: quiz.title, 
     questions: quiz.questions, ratings: quiz.ratings, created: quiz.created
    };
  }

  createQuizzes() : Quiz[]{
    let tempList : Quiz[] = [];
   this.getAllQuizzes().subscribe(res => {
    res.map(item => {
      
      //console.log(this.getQuiz(item))
      tempList.push(this.getQuiz(item))
      
      
    })
    //console.log(tempList)
   }, error => {
     console.log(error)
   })

   return tempList;
    
  }


}
