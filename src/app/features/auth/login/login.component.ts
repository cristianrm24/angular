import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Usuario } from '../../../data/auth/usuario';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
      private carritoService: CarritoService,

    private router: Router
  ) {}

login() {
  this.authService.login(this.email, this.password).subscribe({
    next: (usuario) => {
      this.authService.guardarSesion(usuario);

      this.router.navigate(['/']);
    },
    error: err => {
      alert('Credenciales incorrectas');
            console.error(err);

    }
  });
}


}
