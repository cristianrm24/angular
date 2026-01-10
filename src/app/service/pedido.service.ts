import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  generarPedido() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.post(
      `${this.api}/usuarios/${usuario.idUsuario}/pedidos`,
      {}
    );
  }

  listarPedidosUsuario() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.get(
      `${this.api}/usuarios/${usuario.idUsuario}/pedidos`
    );
  }
}
