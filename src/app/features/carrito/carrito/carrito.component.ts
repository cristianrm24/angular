import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../service/carrito.service';
import { CarritoItem } from '../../../data/carrito/carrito-item';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

items: CarritoItem[] = [];


  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.items = this.carritoService.obtenerItems();
  }

  eliminar(id: number) {
    this.carritoService.eliminarProducto(id);
    this.items = this.carritoService.obtenerItems();
  }

  total(): number {
    return this.carritoService.total();
  }
}
