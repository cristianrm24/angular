import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Router } from '@angular/router';

import { Usuario } from '../../../data/usuario/usuario';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-perfil.component.html'
})
export class EditarPerfilComponent implements OnInit {

  usuario!: Usuario;


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.obtenerUsuario();
    if (!user) return;

this.usuarioService.obtenerPerfil(user.idUsuario).subscribe({
  next: (data: Usuario) => this.usuario = data
});
  }

guardar() {
  this.usuarioService.actualizarPerfil(this.usuario.idUsuario, {
    nombre: this.usuario.nombre,
    direccion: this.usuario.direccion
  }).subscribe({
    next: (usuarioActualizado) => {
      this.authService.setUsuario(usuarioActualizado);

      alert('Perfil actualizado');
      this.router.navigate(['/perfil']);
    }
  });
}

}
