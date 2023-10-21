// app/models/user.model.ts

export class User {
    name: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
  
    constructor() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.role = '';
      this.profilePicture = '';
    }
  }
  
  