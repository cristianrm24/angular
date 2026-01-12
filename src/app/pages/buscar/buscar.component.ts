import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../data/producto/producto';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.component.html'
})
export class BuscarComponent {

  q: string = '';
  minPrecio?: number;
  maxPrecio?: number;

  productos: Producto[] = [];
  cargando = false;

  constructor(private productoService: ProductoService) {}

  buscar() {
    this.cargando = true;

    this.productoService.listar({
      q: this.q,
      minPrecio: this.minPrecio,
      maxPrecio: this.maxPrecio
    }).subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      },
      error: err => {
        console.error(err);
        this.cargando = false;
      }
    });
  }
}
