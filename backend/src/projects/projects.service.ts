import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { NotificationsGateway } from 'src/notifications/notification.gateway';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    private notificationsGateway: NotificationsGateway
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepo.find();
  }
  async getProjectById(id:number): Promise<Project | null> {
  const project = await this.projectRepo.findOne({ where: { id } });
  return project;
  }

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const newProject = this.projectRepo.create(projectData);
    await this.projectRepo.save(newProject);
    this.notificationsGateway.sendNotification('projectCreated', newProject);
    return newProject;
  }

  async updateProject(id: number, updatedData: Partial<Project>): Promise<Project | null> {
    delete updatedData['status']; 
    await this.projectRepo.update(id, updatedData);
    const updatedProject = await this.projectRepo.findOne({ where: { id } });

    if (updatedProject) {
        // const { status, ...projectWithoutStatus } = updatedProject;
        this.notificationsGateway.sendNotification('projectUpdated', updatedProject);
    }

    return updatedProject;
}


  async deleteProject(id: number): Promise<void> {
    await this.projectRepo.delete(id);
    this.notificationsGateway.sendNotification('projectDeleted', { id });
  }
}
