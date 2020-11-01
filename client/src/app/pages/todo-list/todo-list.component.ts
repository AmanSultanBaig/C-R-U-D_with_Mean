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
  isVisible: boolean = false;
  editVisible: boolean = false;
  addVisible: boolean = false;
  isOkLoading = false;
  oneTodo;
  getAllTodos;
  confirmModal?: NzModalRef; // For testing by now

  UpdateName = ''
  UpdateEmail = ''
  UpdatePhone = ''
  copyId = ''

  add_name = ''
  add_email = ''
  add_phone = ''

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

  getTodoByID(id) {
    this._api.getTodoById(id).subscribe(todo => {
      this.oneTodo = todo;
      this.oneTodo = this.oneTodo.data;
    })
  }

  // view todo modal
  showModal(todoId, flag) {
    this.copyId = todoId;
    if (flag === 'view-state' && todoId) {
      this.getTodoByID(todoId)
      this.isVisible = true
    }
    else if (flag === 'edit-state' && todoId) {
      this.getTodoByID(todoId)
      this.editVisible = true
    }
    else if (flag === 'add-state' && !todoId) {
      this.addVisible = true
    }
  }

  handleOk(flag): void {
    if (flag == 'view-ok') {
      this.isVisible = false
    }
    else if (flag == 'edit-ok') {
      let body = {
        Name: this.UpdateName || this.oneTodo.Name,
        Email: this.UpdateEmail || this.oneTodo.Email,
        Phone: this.UpdatePhone || this.oneTodo.Phone,
      }
      this._api.editTodo(body, this.copyId).subscribe(todo => {
        this.message.success('Updated Successfully!!!');
        this.editVisible = false;
        // displaying added todos
        this.getTodos()
      })
    }
    else if (flag == 'add-ok') {
      let body = {
        Name: this.add_name,
        Email: this.add_email,
        Phone: this.add_phone,
      }
      this._api.addTodo(body).subscribe(todo => {
        this.message.success('Added  Successfully!!!');
        this.addVisible = false;
        // displaying added todos
        this.getTodos();
        this.resetForm()
      }, (err: any) => {
        if (err.error.message == "Email Already Exists") {
          this.message.error(err.error.message)
        } else if(err.error.message == "Phone Already Exists") {
          this.message.error(err.error.message)
        }
      })

    }
  }

  handleCancel(flag): void {
    if (flag == 'view-cancel') {
      this.isVisible = false
    } else if (flag == 'edit-cancel') {
      this.editVisible = false
    } else if (flag == 'add-cancel') {
      this.addVisible = false
    }
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

  // reset add todo form fields
  resetForm() {
    this.add_name = null;
    this.add_email = null;
    this.add_phone = null;
  }

}
