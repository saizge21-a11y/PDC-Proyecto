import { Component } from '@angular/core';
import { NgFor, NgIf } from "@angular/common";
import { RouterLink } from '@angular/router';
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../interfaces/empresa';

@Component({
  selector: 'app-list-table-empresa',
  standalone: true,
  imports: [NgFor, RouterLink, ProgressBar, NgIf],
  templateUrl: './list-table-empresa.html',
  styleUrl: './list-table-empresa.css'
})
export class ListTableEmpresa {
  listEmpresa: Empresa[] = [];
  loading = false;

  constructor(private _dataServices: DataServices, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListEmpresas();
  }

  getListEmpresas() {
  this.loading = true;
  this._dataServices.getListEm().subscribe({
    next: (data: Empresa[] | any) => {
      this.listEmpresa = Array.isArray(data) ? data : (data.listEmpresas ?? data);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando empresas', err);
      this.loading = false;
    }
  });
}


  deleteEmpresa(id: number | undefined) {
    if (!id) return;
    this.loading = true;
    this._dataServices.deleteEm(id).subscribe({
      next: () => {
        this.toastr.warning('La empresa fue eliminada con éxito', 'Empresa Eliminada');
        this.getListEmpresas();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
