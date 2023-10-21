// project-manager-role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerRoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // You need to implement the logic to check the user's role here
    // Replace this with your actual user role retrieval logic
    const userRole = this.getUserRole(); // Implement this method

    if (userRole === 'Admin' || userRole === 'Project Manager') {
      return true; // User with 'Admin' or 'Project Manager' role is allowed to access the route
    } else {
      this.router.navigate(['/dashboard']); // Redirect unauthorized users to the dashboard
      return false; // User is not allowed to access the route
    }
  }

  // Implement the method to retrieve the user's role (e.g., from localStorage or a service)
  private getUserRole(): string | null {
    const userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      const user = JSON.parse(userinfo);
      return user.role;
    }
    return null; // Return null when userinfo is not available
  }
}
