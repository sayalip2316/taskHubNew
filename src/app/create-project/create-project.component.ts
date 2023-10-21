import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class AddProjectComponent implements OnInit {
  newProject: any = {}; // Object to store project data
  projectManagers: any[] = []; // Fetch this from your backend
  teamMembers: any[] = []; // Fetch this from your backend

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Fetch project managers and team members when the component is initialized
    this.fetchProjectManagers();
    this.fetchTeamMembers();
  }

  fetchProjectManagers(): void {
    // Use ProjectService to fetch project managers and update this.projectManagers
    this.projectService.getProjectManagers().subscribe((data) => {
      this.projectManagers = data;
      console.log(data)
    });
  }

  fetchTeamMembers(): void {
    // Use ProjectService to fetch team members and update this.teamMembers
    this.projectService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
    });
  }

  createProject(): void {
    const userinfo = localStorage.getItem("userInfo");
  
    if (userinfo) {
      const user = JSON.parse(userinfo);
  
      if (user.role === 'Admin') { // Use user.role to check the user's role
        // Call ProjectService to create a new project using this.newProject data
        this.projectService.createProject(this.newProject).subscribe(
          (response) => {
            alert(response.msg); // Display a success message
          },
          (error) => {
            alert(error.error.msg); // Display an error message
          }
        );
      } else {
        alert('Access denied. Only users with the "Admin" role can create a project.');
      }
    } else {
      alert('User information not found. Please log in.');
    }
  }
  
  getUserName(): string {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.name;
    }
    return 'User'; // Default name if user info is not available
  }
}
