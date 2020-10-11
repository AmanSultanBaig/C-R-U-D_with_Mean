import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  oneTodo;
  getAllTodos;


  constructor(private _api: RestApiService) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this._api.getAllTodos().subscribe(todo => {
      this.getAllTodos = todo;
      this.getAllTodos = this.getAllTodos.data;
    })
  }


  showModal(todoId) {
    this._api.getTodoById(todoId).subscribe(todo => {
      this.oneTodo = todo;
      this.oneTodo = this.oneTodo.data;
      this.isVisible = true;
    })
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
