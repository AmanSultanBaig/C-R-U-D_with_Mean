import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  confirmModal?: NzModalRef; // For testing by now


  constructor(private _api: RestApiService, private modal: NzModalService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.getTodos()
  }

  // get all todos
  getTodos() {
    this._api.getAllTodos().subscribe(todo => {
      this.getAllTodos = todo;
      this.getAllTodos = this.getAllTodos.data;
    })
  }

  // view todo modal
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

  // delete todo
  deleteTodo(todoId) {
    this._api.deleteTodo(todoId).subscribe(todo => {
      this.message.success('Data has been deleted');
      this.getTodos()
    })
  }

  // delete confirmation box before delete todo
  deleteConfirm(todoId) {
    this.confirmModal = this.modal.error({
      nzTitle: 'Are you sure to delete this Todo?',
      nzContent: 'Kindly think before click on Yes Button !',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteTodo(todoId),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
