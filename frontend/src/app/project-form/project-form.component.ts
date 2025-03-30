import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  standalone: false,
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditing: boolean = false;
  projectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required] // Default status
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditing = true;
      this.loadProject();
    }
  }

  loadProject(): void {
    this.apiService.getProjectById(this.projectId!).subscribe((project) => {
      this.projectForm.patchValue(project);
    });
  }

  submitForm(): void {
    if (this.projectForm.invalid) return;

    const projectData = this.projectForm.value;

    if (this.isEditing) {
      this.apiService.updateProject(Number(this.projectId), projectData).subscribe(() => {
        alert('Project updated successfully!');
        this.router.navigate(['/projects']);
      });
    } else {
      this.apiService.createProject(projectData).subscribe(() => {
        alert('Project created successfully!');
        this.router.navigate(['/projects']);
      });
    }
  }
}
