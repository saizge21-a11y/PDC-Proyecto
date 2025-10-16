import { Component } from '@angular/core';
import { NgFor, NgIf } from "@angular/common";
import { RouterLink } from '@angular/router';
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { ToastrService } from 'ngx-toastr';
import { Trabajador } from '../../interfaces/trabajador';

@Component({
  selector: 'app-list-table-trabajador',
  standalone: true,
  imports: [NgFor, RouterLink, ProgressBar, NgIf],
  templateUrl: './list-table-trabajador.html',
  styleUrl: './list-table-trabajador.css'
})
export class ListTableTrabajador {
  listTrabajadores: any[] = [];
  listEmpresas: any[] = [];

  loading = false;

  constructor(private _dataServices: DataServices, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListTrabajadores();
  }

getListTrabajadores() {
  this.loading = true;
  this._dataServices.getListTrabajador().subscribe({
    next: (data: any) => {
      console.log('Respuesta backend trabajadores:', JSON.stringify(data, null, 2));

      this.listTrabajadores = Array.isArray(data) ? data : (data.listTrabajador || data.listTrabajadores || []);


      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando trabajadores:', err);
      this.loading = false;
    }
  });
}



  deleteTrabajador(id: number | undefined) {
    if (!id) return;
    this.loading = true;
    this._dataServices.deleteTrabajador(id).subscribe({
      next: () => {
        this.toastr.warning('El trabajador fue eliminado con éxito', 'Trabajador Eliminado');
        this.getListTrabajadores();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
