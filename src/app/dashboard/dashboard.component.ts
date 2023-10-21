import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  teamMembers: any[] = [];

  constructor(
    private projectService: ProjectService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
      console.log(data)
      // Fetch team member details
      this.projectService.getTeamMembers().subscribe((teamData) => {
        this.teamMembers = teamData;
      });
    });
  }

  getUserName(): string {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.name;
    }
    return 'User'; // Default name if user info is not available
  }

  deleteTask(taskId: string): void {
    // Make an API call to delete the task using your service
    this.projectService.deleteTask(taskId).subscribe(
      () => {
        // Handle success: Remove the task from the projects array to update the UI
        this.projects = this.projects.filter((project) => project._id !== taskId);
        this.cdRef.detectChanges(); // Trigger change detection
      },
      (error) => {
        // Handle the error as needed
        console.error('Task deletion failed.', error);
      }
    );
  }

  deleteProject(projectId: string): void {
    this.projectService.deleteProject(projectId).subscribe(
      (response) => {
        alert(response.message);
        this.cdRef.detectChanges();
        // Display a success message
        // Handle any additional logic here, e.g., updating the projects list.
      },
      (error) => {
        alert(error.error.message); // Display an error message
        // Handle any error cases here.
      }
    );
  }

  updateProject(project: any): void {
    // Implement the logic to open an edit form for the project.
    // You can use a dialog, a modal, or a form to edit the project details.
  }

}
