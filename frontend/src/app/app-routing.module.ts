import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './project-edit-form/project-edit-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/edit/:id', component: EditProjectComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
