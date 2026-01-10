import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pago.component.html'
})
export class PagoComponent {

  procesando = false;

  constructor(private router: Router) {}

  pagar() {
    this.procesando = true;

    // ⏳ simulamos llamada a pasarela
    setTimeout(() => {
      // pago exitoso
      this.router.navigate(['/checkout']);
    }, 2000);
  }

  cancelar() {
    this.router.navigate(['/carrito']);
  }
}
