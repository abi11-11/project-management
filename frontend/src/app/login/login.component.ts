import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  role: 'admin' | 'viewer' = 'viewer';
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login(this.username, this.password, this.role).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

}
