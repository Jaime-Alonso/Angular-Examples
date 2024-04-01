import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  error: string = '';
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log("onSubmit");
    
    if (this.loginForm.valid) {
      this.authService.GetToken(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      ).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (error) => this.error = 'Email or Password Incorrect'
    });
    }
  }
}
