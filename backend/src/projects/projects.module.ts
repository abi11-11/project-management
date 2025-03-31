import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { NotificationsGateway } from 'src/notifications/notification.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService, NotificationsGateway],
  exports: [ProjectsService]
})
export class ProjectsModule {}
