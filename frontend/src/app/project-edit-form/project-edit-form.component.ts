import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './project-edit-form.component.html',
  standalone: false,
  styleUrls: ['./project-edit-form.component.css']
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProject();
  }

  loadProject() {
    this.apiService.getProjectById(this.projectId).subscribe((project: { [key: string]: any; }) => {
      this.projectForm.patchValue(project);
    });
  }

  updateProject() {
    if (this.projectForm.valid) {
      this.apiService.updateProject(Number(this.projectId), this.projectForm.value).subscribe(() => {
        alert('Project updated successfully!');
        this.router.navigate(['/projects']);
      });
    }
  }
}
