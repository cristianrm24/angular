import { Injectable } from '@angular/core';
import { CarritoItem } from '../data/carrito/carrito-item';
import { Producto } from '../data/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: CarritoItem[] = [];

  obtenerItems(): CarritoItem[] {
    return this.items;
  }

  agregarProducto(producto: Producto) {
    const item = this.items.find(i => i.producto.idProducto === producto.idProducto);

    if (item) {
      item.cantidad++;
      item.subtotal = item.cantidad * producto.precio;
    } else {
      this.items.push({
        producto,
        cantidad: 1,
        subtotal: producto.precio
      });
    }
  }

  eliminarProducto(idProducto: number) {
    this.items = this.items.filter(i => i.producto.idProducto !== idProducto);
  }

  vaciar() {
    this.items = [];
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.subtotal, 0);
  }
}
