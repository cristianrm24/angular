import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../../service/carrito.service';
import { PedidoService } from '../../../service/pedido.service';
import { AuthService } from '../../../service/auth.service';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {

  pedidos: any[] = [];
  cargando = true;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) return;

    this.pedidoService.listarPedidos().subscribe(data => {
      // si backend devuelve todos → filtras por usuario
      this.pedidos = data.filter(p => p.usuario.idUsuario === usuario.idUsuario);
      this.cargando = false;
    });
  }
}
