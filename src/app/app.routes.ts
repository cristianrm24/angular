import { Routes } from '@angular/router';
import { ProductoListComponent } from './features/productos/producto-list/producto-list/producto-list.component';

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
