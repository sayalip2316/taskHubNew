import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'https://projecthub-2rbt.onrender.com/project'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, projectData);
  }

  updateProject(projectId: string, updatedProjectData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${projectId}`, updatedProjectData);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${projectId}`);
  }

  getProjectManagers(): Observable<any> {
    return this.http.get("https://projecthub-2rbt.onrender.com/user/projectManagers");
  }

  getTeamMembers(): Observable<any> {
    return this.http.get("https://projecthub-2rbt.onrender.com/user/teammembers");
  }

  getTeamMembersWithTasks(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${projectId}/teamMembersWithTasks`);
  }
  
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`https://projecthub-2rbt.onrender.com/task/${id}`);
  }
}
