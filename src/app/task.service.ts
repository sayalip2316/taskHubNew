import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://projecthub-2rbt.onrender.com/task'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, taskData);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, taskData);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/:${id}`);
  }

  getProjectManagers(): Observable<any> {
    return this.http.get('https://projecthub-2rbt.onrender.com/user/projectManagers');
  }

  getTeamMembers(): Observable<any> {
    return this.http.get('https://projecthub-2rbt.onrender.com/user/teammembers');
  }

  getAllProjects(): Observable<any> {
    return this.http.get('https://projecthub-2rbt.onrender.com/project/all');
  }

  getTeamMembersForProject(projectId: string): Observable<any> {
    // You need to create a new route in your backend to fetch team members for a specific project
    return this.http.get(`https://projecthub-2rbt.onrender.com/project/${projectId}/teamMembers`);
  }
}
