import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Pages/Login/Login.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
];
