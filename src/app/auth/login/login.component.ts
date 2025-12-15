import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private authservice: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }
  /**
   * Executes when login form is submitted.
   * Calls the auth service to retrieve a token and navigates to the tasks page.
   */
  onSubmit() {
    this.authservice.setToken().subscribe({
      next: () => {
        this.router.navigate(['tasks']);
      },
    });
  }
  /**
   * Checks if a user is already logged.
   */
  ngOnInit() {
    const token = this.authservice.getToken();
    if (token) this.router.navigate(['tasks']);
  }
}
