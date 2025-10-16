
import { Component } from '@angular/core';
import { NgFor } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { NgIf } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { Departamento } from '../../interfaces/departamento';

@Component({
  selector: 'app-list-table-departamento',
  imports: [NgFor, RouterLink, ProgressBar, NgIf],
  standalone: true,
  templateUrl: './list-table-departamento.html',
  styleUrl: './list-table-departamento.css'
})
export class ListTableDepartamento {
  listDepartamento: Departamento[] = [];

  loading: boolean = false;
  constructor(private _dataServices: DataServices, private toastr: ToastrService) { };

  ngOnInit(): void {
    this.getListDep();
  }

  getListDep() {
  this.loading = true;
  setTimeout(() => {
    this._dataServices.getListDep().subscribe((data) => {
      console.log('Respuesta de países:', data);
      this.listDepartamento = data.listDepartamento;

      this.loading = false;
    });
  }, 1000);
}

   deleteDep(id: number) {
    this.loading = true;
    this._dataServices.deleteDep(id).subscribe(() => {
      console.log('Departamento eliminado con ID:', id);
      this.getListDep();
      this.toastr.warning('El departamento fue eliminado con éxito', 'Departamento Eliminado');
    });
  }


}
