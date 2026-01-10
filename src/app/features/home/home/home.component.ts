import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../../service/carrito.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../data/usuario/usuario';

import { ProductoService } from '../../../service/producto.service';
import { CategoriaService } from '../../../service/categoria.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
usuario: any = null;
usuario$!: Observable<Usuario | null>;
categorias: any[] = [];
productosPorCategoria: any = {};


constructor(
  private productoService: ProductoService,
  private categoriaService: CategoriaService,
  private carritoService: CarritoService,

  public authService: AuthService,
  private router: Router
) {  this.usuario$ = authService.usuario$;
}
categoriaSeleccionada: number | null = null;

seleccionarCategoria(id: number) {
  if (this.categoriaSeleccionada === id) {
    this.categoriaSeleccionada = null;
  } else {
    this.categoriaSeleccionada = id;
  }
}
getNombreCategoriaSeleccionada(): string {
  const categoria = this.categorias.find(
    c => c.idCategoria === this.categoriaSeleccionada
  );
  return categoria ? categoria.nombre : '';
}

  ngOnInit(): void {
      this.usuario = this.authService.obtenerUsuario();

    this.categoriaService.listar().subscribe(cats => {
      this.categorias = cats;

      cats.forEach(c => {
this.productoService.listar({ categoria: c.idCategoria }).subscribe(prods => {
  this.productosPorCategoria[c.idCategoria] = prods;
});

      });
    });
  }

agregar(producto: any) {
  if (!this.authService.estaAutenticado()) {
    this.router.navigate(['/login']);
    return;
  }

  this.carritoService.agregarProducto(producto.idProducto, 1)
    .subscribe(() => {
      alert('Producto agregado al carrito');
    });
}


logout() {
  this.authService.logout();
  location.reload(); // recarga limpia carrito
}


  }

