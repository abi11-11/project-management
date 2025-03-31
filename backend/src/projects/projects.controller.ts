import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getProjectsById(@Param('id') id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @SetMetadata('role', Role.Admin)
  @UseGuards(JwtAuthGuard)
  createProject(@Body() project) {
    return this.projectsService.createProject(project);
  }

  @Put(':id')
  @SetMetadata('role', Role.Admin)
  @UseGuards(JwtAuthGuard)
  updateProject(@Param('id') id: number, @Body() updatedProject) {
    return this.projectsService.updateProject(id, updatedProject);
  }

  @Delete(':id')
  @SetMetadata('role', Role.Admin)
  @UseGuards(JwtAuthGuard)
  deleteProject(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }
}