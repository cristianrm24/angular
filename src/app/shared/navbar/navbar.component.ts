import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../data/usuario/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../service/producto.service';
import { CarritoService } from '../../service/carrito.service';
import { Router } from '@angular/router';
import { Producto } from '../../data/producto/producto';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  productos: Producto[] = [];
  cargando = false;
  usuario$: Observable<Usuario | null>;
filtros = {
  q: '',
  minPrecio: undefined as number | undefined,
  maxPrecio: undefined as number | undefined
};


  constructor(
    public authService: AuthService,
        private productoService: ProductoService,
    private carritoService: CarritoService,

    private router: Router

  ) {
    this.usuario$ = this.authService.usuario$;
  }
  ngOnInit(): void {
    this.buscar(); // carga inicial
  }

  buscar() {
    this.cargando = true;

    this.productoService.buscar(this.filtros).subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }


  logout() {
    this.authService.logout();
  }
}
