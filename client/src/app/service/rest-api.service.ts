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

  // get todo by todoId
  getTodoById(todoId): Observable<Todo> {
    return this.httpClient.get(`${this.baseURL}/getTodoById/${todoId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // create todo 
  addTodo(todo): Observable<Todo> {
    return this.httpClient.post(`${this.baseURL}/postTodo`, todo)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // update todo
  editTodo(body, todoId): Observable<Todo> {
    return this.httpClient.put(`${this.baseURL}/updateTodo/${todoId}`, body)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete todo
  deleteTodo(todoId): Observable<Todo> {
    return this.httpClient.delete(`${this.baseURL}/deleteTodo/${todoId}`)
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
      errorMessage = error;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
