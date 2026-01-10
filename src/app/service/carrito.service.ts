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
  const usuario = this.authService.obtenerUsuario();
  if (!usuario) return [];

  const data = localStorage.getItem(`carrito_${usuario.idUsuario}`);
  return data ? JSON.parse(data) : [];
}

constructor(private authService: AuthService) {
  console.log('🛒 CarritoService creado');

  this.authService.usuario$.subscribe(usuario => {
    console.log('👤 Usuario cambiado:', usuario);

    this.items = [];
    this.usuarioActual = usuario;

    if (usuario) {
const key = `carrito_${usuario.idUsuario}`;
      console.log('📦 Cargando carrito:', key);

      const data = localStorage.getItem(key);
      this.items = data ? JSON.parse(data) : [];
    }
  });
}


  private getKey(): string | null {
    const usuario = this.authService.obtenerUsuario();
    return usuario ? `carrito_${usuario.idUsuario}` : null;
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
      `carrito_${this.usuarioActual.idUsuario}`,
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
      `carrito_${this.usuarioActual.idUsuario}`,
      JSON.stringify(this.items)
    );
  }

private guardarCarrito() {
  const usuario = this.authService.obtenerUsuario();
  if (!usuario) return;

  localStorage.setItem(
    `carrito_${usuario.idUsuario}`,
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
