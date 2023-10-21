import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  newTask: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
    assignedTeamMembers: [],
    subTasks: [],
    project: ''
  };
  projectManagers: any[] = [];
  teamMembers: any[] = [];
  projects: any[] = [];
  filteredTeamMembers: any[] = []; // Add this array for filtered team members

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadProjectManagers();
    this.loadTeamMembers();
    this.loadProjects();
  }

  createTask() {
    const userinfo = localStorage.getItem("userInfo");
  
    if (userinfo) {
      const user = JSON.parse(userinfo);
  
      // Check if the user's role is either 'Admin' or 'Project Manager'
      if (user.role === 'Admin' || user.role === 'Project Manager') {
        // You may need to pass the selected project's ID to load team members for that project
        const projectId = this.newTask.project;
  
        // First, update the filtered team members based on the selected project
        this.loadTeamMembersForProject(projectId);
  
        // Then, create the task
        this.taskService.createTask(this.newTask).subscribe((response) => {
          alert(response.msg);
        }, (error) => {
          alert(error.message);
        });
      } else {
        alert('Access denied. Only users with the "Admin" or "Project Manager" role can create a task.');
      }
    } else {
      alert('User information not found. Please log in.');
    }
  }
  

  loadProjectManagers() {
    this.taskService.getProjectManagers().subscribe((data) => {
      this.projectManagers = data;
    }, (error) => {
      console.error('Error loading project managers:', error);
    });
  }

  loadTeamMembers() {
    this.taskService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
      this.filteredTeamMembers = data; // Initialize filtered team members
    }, (error) => {
      console.error('Error loading team members:', error);
    });
  }

  loadProjects() {
    this.taskService.getAllProjects().subscribe((data) => {
      this.projects = data;
    }, (error) => {
      console.error('Error loading projects:', error);
    });
  }

  loadTeamMembersForProject(projectId: string) {
    this.taskService.getTeamMembersForProject(projectId).subscribe((data) => {
      this.filteredTeamMembers = data; // Update the filtered team members based on the selected project
    }, (error) => {
      console.error('Error loading team members for the project:', error);
    });
  }

  onProjectChange() {
    // When the selected project changes, update the list of filtered team members
    const projectId = this.newTask.project;
    this.loadTeamMembersForProject(projectId);
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
