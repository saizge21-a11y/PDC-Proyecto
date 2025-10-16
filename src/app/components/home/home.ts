import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="p-10 text-center">
      <h1 class="text-3xl font-bold mb-4">Bienvenido al Sistema de Gestión</h1>
      <p class="text-lg">Selecciona una opción del menú para comenzar.</p>
    </div>
  `
})
export class Home {}
