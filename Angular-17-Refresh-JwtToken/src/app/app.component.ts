import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Auth/Services/Auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular-17-Refresh-JwtToken';
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {      

    if(!this.authService.isAuthenticated()) {        
        this.router.navigateByUrl('login');
    }
  }
}
