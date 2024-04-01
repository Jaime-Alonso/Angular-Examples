import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);  

  //si está refrescando token o haciendo login
  if(req.url.startsWith(environment.apiUrl + 'token')) {    
    return next(req);
  }

  if(authService.isTokenExpired()) {
    console.log("token expired");

    //puede que el error este por aqui:
    // comprobar cuando no hay token -> debería lanzar la req sin modificar
    // cuando si hay token y  ha expirado -> deberia lanzar primero el refresh (que será interceptado otra vez) <-- problem.
    
    
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
