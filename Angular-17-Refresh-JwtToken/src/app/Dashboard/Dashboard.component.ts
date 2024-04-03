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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit{
  
  apiService: ApiService = inject(ApiService);
  products: any[] = [];  
  
  ngOnInit(): void {

    this.apiService.getProducts().pipe(
      catchError(error => {        
        console.log(error);        
        return of([]);
      })
    ).subscribe(data => {      
      this.products = data
    });
  } 

}
