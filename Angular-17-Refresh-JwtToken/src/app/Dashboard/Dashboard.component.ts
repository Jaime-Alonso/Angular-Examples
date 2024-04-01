import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../Shared/Services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit{
  
  apiService: ApiService = inject(ApiService);
  products: any[] = [];  
  
  ngOnInit(): void {

    this.apiService.getProducts().pipe(
      catchError(error => {
        // Aquí puedes manejar el error, por ejemplo, haciendo un console.log
        console.log(error);
        // Devuelve un observable para que la cadena no se rompa. Puedes devolver `of([])` para devolver un array vacío como valor por defecto.
        return of([]);
      })
    ).subscribe(data => {
      console.log("productos:"+data);
        
      this.products = data
    });
  } 

}
