import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PedidoService } from '../../../service/pedido.service';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedido-detalle.component.html'
})
export class PedidoDetalleComponent implements OnInit {

  pedido: any;
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pedidoService.obtenerPedido(id).subscribe(p => this.pedido = p);
    this.pedidoService.totalPedido(id).subscribe(t => this.total = t);
  }

  descargarFactura() {
    this.pedidoService.descargarFactura(this.pedido.idPedido)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura_${this.pedido.idPedido}.txt`;
        a.click();
      });
  }
}
