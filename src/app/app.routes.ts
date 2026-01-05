import { Routes } from '@angular/router';
import { ProductoListComponent } from 'C:\Users\Cristian Damian\Desktop\proyecto_back\proyecto_back\src\app\features\productos\producto-list\producto-list\producto-list.component.ts';

export const routes: Routes = [
  {
    path: 'productos',
    component: ProductoListComponent
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
