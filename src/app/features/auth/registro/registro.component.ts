import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { RegistroDTO } from '../../../data/auth/registro.dto';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  form: RegistroDTO = {
    nombre: '',
    email: '',
    password: '',
    direccion: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

registrar() {
  this.authService.registrar(this.form).subscribe({
    next: () => {
      alert('Cuenta creada correctamente');
      this.router.navigate(['/login']);
    },
    error: err => {
      if (err.status === 409) {
        alert(err.error.message); // Email ya registrado
      } else {
        alert('Error inesperado al registrar');
      }
    }
  });
}

}
