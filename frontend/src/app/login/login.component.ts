import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService ,
    private _router: Router) { }

  ngOnInit():void{

  }

  login(loginForm: any){
    this.userService.login(loginForm.value).subscribe({
      next : (response) => {
       localStorage.setItem('jwtToken', response.token )
       this._router.navigate(['/todo'])
     },
       error: (err) => console.log(err)
      });
  }

}
// this._router.navigate(['/todo'])
