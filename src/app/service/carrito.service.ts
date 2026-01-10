import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getUserId(): number {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }
    return usuario.idUsuario;
  }

obtenerCarrito() {
  const usuario = this.authService.obtenerUsuario();
  if (!usuario) return EMPTY;

  return this.http.get<any>(
    `${environment.apiUrl}/usuarios/${usuario.idUsuario}/carrito`
  );
}


  agregarProducto(idProducto: number, cantidad: number = 1) {
    return this.http.post(
      `${this.api}/usuarios/${this.getUserId()}/carrito/items`,
      { idProducto, cantidad }
    );
  }



eliminarProducto(idProducto: number) {
  const usuario = this.authService.obtenerUsuario();

  if (!usuario) {
    console.warn('No hay usuario, no se puede eliminar');
    return EMPTY; // ✔ Observable válido
  }

  return this.http.delete(
    `${environment.apiUrl}/usuarios/${usuario.idUsuario}/carrito/items/${idProducto}`
  );
}

  vaciarCarrito() {
    return this.http.delete(
      `${this.api}/usuarios/${this.getUserId()}/carrito/items`
    );
  }

  total() {
    return this.http.get<number>(
      `${this.api}/usuarios/${this.getUserId()}/carrito/total`
    );
  }
}
