import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './project-edit-form/project-edit-form.component';

@NgModule({
  declarations: [ // Declare all components
    AppComponent,
    LoginComponent,
    ProjectFormComponent,
    EditProjectComponent, 
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [], // Add global services here if needed
  bootstrap: [AppComponent] // Bootstraps the application
})
export class AppModule {}
