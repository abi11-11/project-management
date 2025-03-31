  import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ProjectsController } from './projects/projects.controller';
import { UsersController } from './users/users.controller';
import { ProjectsService } from './projects/projects.service';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsGateway } from './notifications/notification.gateway';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { Project } from './projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 55432,
    username: 'postgres',
    password: 'admin',
    database: 'nestjs_app',
    autoLoadEntities: true, 
    synchronize: true, // ⚠ Set to `false` in production
  }),TypeOrmModule.forFeature([User,Project]), ConfigModule.forRoot({ isGlobal: true }) // ✅ Loads .env globally
  ,AuthModule, ProjectsModule, UsersModule],
  controllers: [AppController, ProjectsController, UsersController],
  providers: [AppService, ProjectsService, UsersService, NotificationsGateway],
})
export class AppModule {}



