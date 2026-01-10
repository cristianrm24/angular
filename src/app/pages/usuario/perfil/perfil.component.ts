import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../data/usuario/usuario';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario!: Usuario;


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    const user = this.authService.obtenerUsuario();
    if (!user) return;

this.usuarioService.obtenerPerfil(user.idUsuario).subscribe({
  next: (data: Usuario) => this.usuario = data
});

  }
}
