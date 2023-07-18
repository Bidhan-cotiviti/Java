import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

interface Todo {
  emp_id: string;
  name: string;
  position: string;
  date: string;
  remarks: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private http: HttpClient, private _router: Router, private userService: UserService, private location: Location) { }

  ngOnInit() {
    // this.http.get<Todo[]>('http://localhost:8080/api').subscribe(todos => {
    //   this.todos = todos;
    const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

    console.log(jwtToken)

    if (jwtToken) {
    this.userService.getTodos(jwtToken).subscribe({
      next :(todos: Todo[]) => {
        this.todos = todos;
      },
       error: (err) => console.log(err)
      });
    } else {
      // Handle the case where JWT token is null
      console.log('JWT token is null');
      // Redirect to login page or perform any other action
      this._router.navigate(['/login']);
    }

  }

  add(){
    this._router.navigate(['/add'])
  }

  editTodo(todo: Todo) {
    this._router.navigate(['/edit'], { state: { todo } })
   }

  deleteTodo(todo: Todo) {
    console.log('Delete emp_id:', todo.emp_id);
    const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

    if (jwtToken) {
    this.userService.delete(todo, jwtToken).subscribe({
      next : (response) => {
       console.log(jwtToken)
       console.log(response)
       this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/todo']);
      });
       
     },
       error: (err) => console.log(err)
      });
    } else {
      // Handle the case where JWT token is null
      console.log('JWT token is null');
      // Redirect to login page or perform any other action
      this._router.navigate(['/login']);
    }
  }

}
