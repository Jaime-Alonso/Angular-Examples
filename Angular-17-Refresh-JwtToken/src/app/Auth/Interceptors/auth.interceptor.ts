import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  
  if(req.url.startsWith(environment.apiUrl + 'token')) {    
    return next(req);
  }

  if(authService.isTokenExpired()) {
    console.log("token expired");    
    
    return authService.RefreshToken().pipe(
      switchMap(() => {
        const token = localStorage.getItem('auth_token');
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        return next(req);
      })
    );
  } 
  
  const token = localStorage.getItem('auth_token');
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
  return next(req);
};
