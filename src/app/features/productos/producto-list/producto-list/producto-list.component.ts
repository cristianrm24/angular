import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../../../service/producto.service';
import { Producto } from '../../../../data/producto/producto';


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.component.html'
})
export class ProductoListComponent implements OnInit {

  productos: Producto[] = [];
  cargando = false;

  constructor(private productoService: ProductoService) {}

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
