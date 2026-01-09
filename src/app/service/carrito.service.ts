import { Injectable } from '@angular/core';
import { CarritoItem } from '../data/carrito/carrito-item';
import { Producto } from '../data/producto/producto';
import { AuthService } from './auth.service';
import { Usuario } from '../data/auth/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: CarritoItem[] = [];
  private usuarioActual: Usuario | null = null;

  obtenerItems(): CarritoItem[] {
    return this.items;
  }

  constructor(private authService: AuthService) {
    this.authService.usuario$.subscribe(usuario => {
      this.usuarioActual = usuario;

      if (usuario) {
        const data = localStorage.getItem(`carrito_${usuario.id}`);
        this.items = data ? JSON.parse(data) : [];
      } else {
        this.items = [];
      }
    });
  }

  private getKey(): string | null {
    const usuario = this.authService.obtenerUsuario();
    return usuario ? `carrito_${usuario.id}` : null;
  }

private cargarCarrito(idUsuario: number) {
  const data = localStorage.getItem(`carrito_${idUsuario}`);
  this.items = data ? JSON.parse(data) : [];
}
agregarProducto(producto: Producto) {
    const item = this.items.find(i => i.producto.idProducto === producto.idProducto);
    if (!this.usuarioActual) {
      console.warn('No hay usuario, no se puede guardar carrito');
      return;
    }

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
    localStorage.setItem(
      `carrito_${this.usuarioActual.id}`,
      JSON.stringify(this.items)
    );


  }



  vaciarCarrito() {
    this.items = [];
    this.guardarCarrito();
  }


  eliminarProducto(idProducto: number) {
    if (!this.usuarioActual) return;

    this.items = this.items.filter(i => i.producto.idProducto !== idProducto);

    localStorage.setItem(
      `carrito_${this.usuarioActual.id}`,
      JSON.stringify(this.items)
    );
  }

private guardarCarrito() {
  const usuario = this.authService.obtenerUsuario();
  if (!usuario) return;

  localStorage.setItem(
    `carrito_${usuario.id}`,
    JSON.stringify(this.items)
  );
}

  vaciar() {
    this.items = [];
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.subtotal, 0);
  }
}
