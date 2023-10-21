import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logout(): void {
    // Implement your logout logic here, e.g., clearing user data and token
    localStorage.removeItem('token'); // Clear the user token
    localStorage.removeItem('userInfo'); // Clear user-related data

    // Redirect the user to the login page
    window.location.href = '/login'; // Or use Angular router.navigate to navigate to the login page
  }
}
