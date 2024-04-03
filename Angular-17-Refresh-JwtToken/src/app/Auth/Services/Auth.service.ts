import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../Interfaces/LoginResponse';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  private readonly tokenStorageKey = 'auth_token';
  private readonly refreshTokenStorageKey = 'refresh_token';
  private readonly tokenExpirationStorageKey = 'token_expiration';
  private readonly userEmailStorageKey = 'user_email';

  public GetToken(email: string, password: string): Observable<LoginResponse> {
    const body = {
      email: email,
      password: password,
    };

    return this.http
      .post<LoginResponse>(environment.apiUrl + 'token', body)
      .pipe(
        tap((authInfo) => this.storeAuthInfo(authInfo)),
        catchError(throwError)
      );
  }

  public RefreshToken(): Observable<LoginResponse> {
    const body = {
      email: localStorage.getItem(this.userEmailStorageKey),
      refreshToken: localStorage.getItem(this.refreshTokenStorageKey),
    };

    return this.http
      .put<LoginResponse>(environment.apiUrl + 'token', body)
      .pipe(
        tap((authInfo) => this.storeAuthInfo(authInfo)),
        catchError((err) => this.handleRefreshTokenError(err))
      );
  }

  public isTokenExpired(): boolean {
    const expiration = localStorage.getItem(this.tokenExpirationStorageKey);
    if (!expiration) {
      return true;
    }

    const result = new Date(expiration!) < new Date();

    return result;
  }

  public isAuthenticated(): boolean {
    const user = localStorage.getItem(this.userEmailStorageKey);
    if (user) {
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(this.userEmailStorageKey);
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.tokenExpirationStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
  }

  private storeAuthInfo(tokens: LoginResponse) {
    const { email, accessToken, accessTokenExpiration, refreshToken } = tokens;
    localStorage.setItem(this.userEmailStorageKey, email);
    localStorage.setItem(this.tokenStorageKey, accessToken);
    localStorage.setItem(this.tokenExpirationStorageKey, accessTokenExpiration);
    localStorage.setItem(this.refreshTokenStorageKey, refreshToken);
  }

  handleRefreshTokenError(error: HttpErrorResponse): Observable<never> {
    this.logout();
    this.router.navigateByUrl('login');
    return throwError(() => new Error('Error: ' + error.message));
  }
}
