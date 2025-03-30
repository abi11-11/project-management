import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from 'src/notifications/notification.gateway';

@Injectable()
export class ProjectsService {
  private projects : any = [];

  constructor(private notificationsGateway: NotificationsGateway) {}

  getAllProjects() {
    return this.projects;
  }

  createProject(project) {
    this.projects.push(project);
    this.notificationsGateway.sendNotification('projectCreated', project);
    return project;
  }

  updateProject(id, updatedProject) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) this.projects[index] = updatedProject;
    this.notificationsGateway.sendNotification('projectUpdated', updatedProject);
    return updatedProject;
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.notificationsGateway.sendNotification('projectDeleted', { id });
  }
}
