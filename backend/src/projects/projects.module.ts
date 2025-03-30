import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { NotificationsGateway } from 'src/notifications/notification.gateway';

@Module({
  providers: [ProjectsService, NotificationsGateway],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
