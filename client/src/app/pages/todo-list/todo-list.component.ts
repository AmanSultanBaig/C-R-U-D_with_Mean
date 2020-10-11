import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  constructor(private _api: RestApiService) { }
  getAllTodos;

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this._api.getAllTodos().subscribe(todo => {
      this.getAllTodos = todo;
      this.getAllTodos = this.getAllTodos.data;
      console.log(this.getAllTodos)
    })
  }

}
