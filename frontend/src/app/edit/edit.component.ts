import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

interface Todo {
  emp_id: string;
  name: string;
  position: string;
  date: string;
  remarks: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  todo!: Todo;

  constructor(private userService: UserService ,
    private _router: Router) { }

  ngOnInit():void{
    this.todo = history.state.todo;
    console.log('Todo data:', this.todo);

  }

  update(updateForm: any){
    const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

    if(jwtToken){
    this.userService.update(updateForm.value, jwtToken).subscribe({
      next : (response) => {
       console.log(response)
       this._router.navigate(['/todo'])
       
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
