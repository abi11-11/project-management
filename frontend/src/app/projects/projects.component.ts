import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone:false,
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  role: string = localStorage.getItem('role') || 'Viewer';
  notifications: string[] = [];

  constructor(private apiService: ApiService, private socketService: SocketService) {}

  ngOnInit() {
    this.loadProjects();
    this.socketService.listen('notification', (message: string) => {
      this.notifications.push(message);
    });
  }

  loadProjects() {
    this.apiService.getProjects().subscribe(data => this.projects = data);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure?')) {
      this.apiService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role'); // Make sure role is stored in localStorage during login
    return role === 'admin';
  }
}
