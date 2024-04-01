import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http: HttpClient = inject(HttpClient);

  public getProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + 'products');
  }

}
