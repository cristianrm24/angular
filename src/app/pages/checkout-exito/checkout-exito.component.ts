import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-exito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout-exito.component.html'
})
export class CheckoutExitoComponent implements OnInit {

  idPedido!: number;

  ngOnInit(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('id'));
  }

  constructor(private route: ActivatedRoute) {}
}
