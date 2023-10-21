// registration.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = new User(); // Define the user object to store form data
  
  constructor(private http: HttpClient, private router: Router) {}
  
  onFileChange(event: any) {
    // Handle file input change and store the selected file in user.profilePicture
    const file = event.target.files[0];
    this.user.profilePicture = file;
  }

  registerUser() {
    fetch('https://taskhub-hvv2.onrender.com/user/register', {
    method: 'POST',
    body: JSON.stringify(this.user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.msg=="Registration successfull"){
      alert(res.msg);
      this.router.navigate(['/login']);
    }
  })
  .catch(err=>console.log(err))
}
}
