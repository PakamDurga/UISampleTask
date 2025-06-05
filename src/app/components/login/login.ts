import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  currentUser = {};
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
    next: (user) => {
      //storing the session.
       
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user)); // optional
      
       this.router.navigate(['/home'])
    },
    error: (errorObject) => {
      console.log(errorObject)
      const errorMessage = errorObject?.error?.message || 'Invalid username or password';
      this.error = errorMessage;
      alert('Login failed')
    }
  });
  }
}
