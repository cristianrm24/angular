import { Routes } from '@angular/router';
import { ProductoListComponent } from './features/productos/producto-list/producto-list/producto-list.component';
import { CategoriaListComponent } from './features/categorias/categorias-list/categoria-list/categoria-list.component';
import { ProductoFormComponent } from './features/productos/producto-list/producto-form/producto-form.component';
import { CarritoComponent } from './features/carrito/carrito/carrito.component';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PedidoListComponent } from './features/pedido/pedido-list/pedido-list.component';
import { PedidoDetalleComponent } from './features/pedido/pedido-detalle/pedido-detalle.component';
import { CheckoutExitoComponent } from './pages/checkout-exito/checkout-exito.component';
import { PagoComponent } from './features/pago/pago.component';
import { } from './features/pago/pago.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoListComponent },
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent,},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mis-pedidos',component: PedidoListComponent},
  { path: 'pedido/:id', component: PedidoDetalleComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent},
  { path: 'perfil',  loadComponent: () => import('./pages/usuario/perfil/perfil.component').then(m => m.PerfilComponent)},
  { path: 'perfil/pedidos',component: PedidoListComponent},
  { path: 'perfil/editar', loadComponent: () => import('./pages/usuario/editar-perfil/editar-perfil.component').then(m => m.EditarPerfilComponent)
},
{
  path: 'categorias',
  loadComponent: () => import('./features/categorias/categorias-list/categoria-list/categoria-list.component')
    .then(m => m.CategoriaListComponent)
},
{
  path: 'categorias/nueva',
  loadComponent: () => import('./features/categorias/categorias-list/categoria-form/categoria-form.component')
    .then(m => m.CategoriaFormComponent)
},
{
  path: 'categorias/editar/:id',
  loadComponent: () => import('./features/categorias/categorias-list/categoria-form/categoria-form.component')
    .then(m => m.CategoriaFormComponent)
},
{
  path: 'categorias/:id',
  loadComponent: () => import('./features/categorias/detalle-categoria/detalle-categoria.component')
    .then(m => m.CategoriaDetalleComponent)
},

  { path: 'checkout-exito/:id', component: CheckoutExitoComponent},

  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];
