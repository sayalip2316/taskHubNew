import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User(); // Define the user object to store form data
  
  constructor(private http: HttpClient, private router: Router) {}
  
  loginUser() {
    fetch('https://projecthub-2rbt.onrender.com/user/login', {
      method: 'POST',
      body: JSON.stringify(this.user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.msg=="Login Successfull"){
        localStorage.setItem("token",res.token)
        localStorage.setItem("userInfo",JSON.stringify(res.user))
        alert(res.msg)
        this.router.navigate(['/dashboard']);
      }
    })
    .catch((err) => console.error(err));
  }
}
