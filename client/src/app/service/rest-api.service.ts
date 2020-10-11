import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Todo } from '../shared/todo';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }
  private baseURL = environment.apiURL

  // **************************
  // Todos related routes
  // **************************

  // get all todos
  getAllTodos(): Observable<Todo> {
    return this.httpClient.get(`${this.baseURL}/getAllTodos`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // create todo 
  addTodo(todo): Observable<Todo> {
    return this.httpClient.post(`${this.baseURL}/addTodo`, todo)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
