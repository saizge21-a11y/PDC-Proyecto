import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais';
import { NgFor } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { NgIf } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-table',
  imports: [NgFor, RouterLink, ProgressBar, NgIf],
  standalone: true,
  templateUrl: './list-table.html',
  styleUrl: './list-table.css'
})
export class ListTable {

  listPaises: Pais[] = [];

  loading: boolean = false;

  constructor(private _dataServices: DataServices, private toastr: ToastrService) { };

  ngOnInit(): void {
    this.getListPaises();
  }

  getListPaises() {
    this.loading = true;
    setTimeout(() => {
      this._dataServices.getListPaises().subscribe((data) => {
        console.log('Respuesta del backend:', data);
        this.listPaises = data.listPais;
        this.loading = false;
      })
    }, 1000);
  }

  deletePais(id: number) {
  this.loading = true;
  this._dataServices.deletePais(id).subscribe({
    next: (res) => {
      this.loading = false;
      this.toastr.success('País eliminado correctamente', 'Éxito');
      this.getListPaises();
    },
    error: (err) => {
      this.loading = false;
      if (err.status === 400 && err.error?.message) {
        this.toastr.warning(err.error.message, 'Advertencia');
      } else {
        this.toastr.error('Error al eliminar el país', 'Error');
      }
      console.error('Error eliminando país:', err);
    }
  });
}



}
