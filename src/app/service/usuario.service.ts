import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Usuario } from '../data/usuario/usuario';
import { Pedido } from '../data/pedido/pedido';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // 👤 USUARIO
  // =========================

  /** Registrar usuario */
  registrar(usuario: {
    nombre: string;
    email: string;
    password: string;
    direccion: string;
  }): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.api}/usuarios/registro`,
      usuario
    );
  }

  /** Obtener perfil */
  obtenerPerfil(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.api}/usuarios/${idUsuario}`
    );
  }

  /** Actualizar perfil */
  actualizarPerfil(
    idUsuario: number,
    data: { nombre: string; direccion: string }
  ): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.api}/usuarios/${idUsuario}`,
      data
    );
  }

  // =========================
  // 📦 PEDIDOS
  // =========================

  /** Pedidos del usuario */
  obtenerPedidos(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.api}/usuarios/${idUsuario}/pedidos`
    );
  }
}
