import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogueado = false;

  login(email: string, password: string): boolean {
    // simulación
    if (email && password) {
      this.usuarioLogueado = true;
      return true;
    }
    return false;
  }

  logout() {
    this.usuarioLogueado = false;
  }

  estaAutenticado(): boolean {
    return this.usuarioLogueado;
  }
}
