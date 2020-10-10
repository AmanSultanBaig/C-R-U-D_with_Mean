import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './pages/todo-list/todo-list.component';


const routes: Routes = [
  { redirectTo: 'get-all-todos', path: '', pathMatch: 'full' },
  { path: 'get-all-todos', component: TodoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
