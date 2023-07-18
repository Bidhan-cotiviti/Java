import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private userService: UserService ,
    private _router: Router) { }

  ngOnInit():void{

  }

  add(addForm: any){
    const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

    if(jwtToken){
    this.userService.add(addForm.value, jwtToken).subscribe({
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
