import { Injectable } from '@angular/core';
import { Quiz } from './entities/quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships/';
  

  constructor(private http: HttpClient) {}
  
  createQuiz(quiz: Quiz) : Observable<any> {
    //url, body
    quiz.customerId = 'andr9';
    quiz.created = new Date();
    return this.http.post(this.baseUrl, quiz);
    
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  updateQuiz(id: string, quiz: Quiz) : Observable<any> {
    quiz.customerId = 'andr9';
    quiz.created = new Date();
    quiz.user = {  // Hardcoded. We remove when we have a proper login
      _id: '1', 
      username: 'Roggels', 
      email: 'rogg@els.dk', 
      gender: Gender.MALE, 
      birthDate: undefined 
    };

    return this.http.put<Quiz>(this.baseUrl + id, quiz)
  }

  deleteQuiz(id: string) : Observable<any> {
    const urlDelete = this.baseUrl + id;
    console.log(urlDelete)
    return this.http.delete(urlDelete);
  }

  getQuiz(quiz: Quiz) : Quiz {
    return { 
      _id: quiz._id, visible: quiz.visible, user: quiz.user, title: quiz.title, 
     questions: quiz.questions, ratings: quiz.ratings, created: quiz.created
    };
  }

  createQuizzes(quizzes: Quiz[]) : Quiz[]{
    let tempList : Quiz[] = [];

    
   
    quizzes.map(item => {
      
      //console.log(this.getQuiz(item))
      tempList.push(this.getQuiz(item))
      
      
    })
    //console.log(tempList)
   

   return tempList;
    
  }


}
