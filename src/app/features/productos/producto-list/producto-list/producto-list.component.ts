import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../../../service/producto.service';
import { Producto } from '../../../../data/producto/producto';
import { Router } from '@angular/router';
import { CarritoService } from '../../../../service/carrito.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.component.html'
})
export class ProductoListComponent implements OnInit {

  productos: Producto[] = [];
  cargando = false;

  constructor(  private productoService: ProductoService,
  private carritoService: CarritoService,
  private router: Router
) {}

  ngOnInit(): void {
    this.cargarProductos();
  }
cargarProductos() {
  this.cargando = true;

  this.productoService.listar().subscribe({
    next: data => {
      console.log('DATA RECIBIDA:', data);
      this.productos = data;
      this.cargando = false;
    },
    error: err => {
      console.error('ERROR:', err);
      this.cargando = false;
    },
    complete: () => {
      console.log('COMPLETADO');
    }
  });
}
editar(producto: any) {
  this.router.navigate(['/productos/editar', producto.idProducto]);
}

eliminar(producto: any) {
  if (!confirm('¿Eliminar producto?')) return;

  this.productoService.eliminar(producto.idProducto).subscribe({
    next: () => {
      alert('Producto eliminado');
      this.cargarProductos();
    },
    error: err => console.error(err)
  });
}
agregarAlCarrito(producto: any) {
  this.carritoService.agregarProducto(producto);
  alert('Producto agregado al carrito');
}
 /* cargarProductos() {
    this.cargando = true;
    this.productoService.listar().subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando productos', err);
        this.cargando = false;
      }
    });
  }*/
}
