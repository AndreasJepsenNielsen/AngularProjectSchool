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

  updateQuiz(quiz: Quiz) : Observable<any> {
    quiz.customerId = 'andr9';
    quiz.created = new Date();
    quiz.user = {  // Hardcoded. We remove when we have a proper login
      _id: '1', 
      username: 'Roggels', 
      email: 'rogg@els.dk', 
      gender: Gender.MALE, 
      birthDate: undefined 
    };
    // type of the returned observable
    return this.http.put(this.baseUrl + '/' + quiz._id, quiz, {responseType: 'text'});
  }

  deleteQuiz(id: string) : Observable<any> {
    const urlDelete = this.baseUrl + id;
    return this.http.delete(urlDelete);
  }
}
