import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  message!: string;
  messageColor!: string;
  
  constructor(private userService: UserService ,
    private _router: Router) { }

  ngOnInit():void{

  }

  register(registerForm: any){
    this.userService.register(registerForm.value).subscribe({
      next : (response) => {
       console.log(response)
       this.message = response.message;
       this.messageColor = (this.message === "User Already exists") ? "red" : "green";
       setTimeout(() => {
        this.message = "";
        registerForm.reset({
          username: '',
          password: ''
        });
      }, 10000);
      registerForm.controls.username.reset;
      registerForm.controls.password.reset;
      // this._router.navigate(['/login'])
       
     },
       error: (err) => console.log(err)
      });
  }
}
