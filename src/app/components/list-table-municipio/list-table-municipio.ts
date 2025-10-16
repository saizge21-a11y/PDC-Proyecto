import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataServices } from '../../services/data';
import { Municipio } from '../../interfaces/municipio';
import { ToastrService } from 'ngx-toastr';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-list-table-municipio',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ProgressBar],
  templateUrl: './list-table-municipio.html',
  styleUrl: './list-table-municipio.css'
})
export class ListTableMunicipio {
  listMunicipio: Municipio[] = [];
  loading = false;

  constructor(private _dataServices: DataServices, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListMunicipio();
  }

  getListMunicipio() {
    this.loading = true;
    setTimeout(() => {
      this._dataServices.getListMun().subscribe((data) => {
        console.log('Respuesta municipios:', data);
        this.listMunicipio = data.listMunicipio;
        this.loading = false;
      });
    }, 1000);
  }

  deleteMunicipio(id: number) {
    this.loading = true;
    this._dataServices.deleteMun(id).subscribe(() => {
      this.getListMunicipio();
      this.toastr.warning('Municipio eliminado con éxito', 'Eliminado');
    });
  }
}
