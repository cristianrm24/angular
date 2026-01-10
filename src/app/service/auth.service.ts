import { Injectable } from '@angular/core';
import { Usuario } from '../data/auth/usuario';
import { BehaviorSubject } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { RegistroDTO } from '../data/auth/registro.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://proyecto-z9eq.onrender.com/api/v1';

  constructor(private http: HttpClient) {}
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuario());
  usuario$ = this.usuarioSubject.asObservable();

    guardarSesion(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  obtenerUsuario(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
  setUsuario(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario); // 🔥 NOTIFICA A TODOS
  }
  estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }
  registrar(data: RegistroDTO) {
    return this.http.post(`${this.apiUrl}/usuarios/registro`, data);
  }
esAdmin(): boolean {
  const usuario = this.obtenerUsuario();
  return usuario?.email === 'admin@gmail.com';
}

login(email: string, password: string) {
  const params = {
    email,
    password
  };

  return this.http.post<Usuario>(
    `${this.apiUrl}/auth/login`,
    null,
    { params }
  );
}







}

