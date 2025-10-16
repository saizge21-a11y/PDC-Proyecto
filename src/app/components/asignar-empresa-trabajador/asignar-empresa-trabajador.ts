import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServices } from '../../services/data';
import { Empresa } from '../../interfaces/empresa';
import { Trabajador } from '../../interfaces/trabajador';
import { NgFor, NgIf } from '@angular/common';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";

@Component({
  selector: 'app-asignar-empresa-trabajador',
  imports: [NgFor, NgIf, ProgressBar],
  standalone: true,
  templateUrl: './asignar-empresa-trabajador.html',
  styleUrls: ['./asignar-empresa-trabajador.css']
})
export class AsignarEmpresaTrabajador implements OnInit {

  idTrabajador!: number;
  trabajador!: Trabajador;
  empresas: Empresa[] = [];
  empresasSeleccionadas: number[] = [];
  loading = false;

  constructor(
    private _dataServices: DataServices,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idTrabajador = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;

    this._dataServices.getListEm().subscribe({
      next: (resp: any) => {
        this.empresas = resp.listEmpresas || [];
        this.cargarEmpresasDelTrabajador();
      },
      error: (err) => {
        console.error('Error al cargar empresas:', err);
        this.loading = false;
      }
    });
  }

  cargarEmpresasDelTrabajador(): void {
    this._dataServices.getEmpresasPorTrabajador(this.idTrabajador).subscribe({
      next: (resp: any) => {
        console.log('Empresas asignadas al trabajador:', resp);

        const lista: Empresa[] = Array.isArray(resp.empresas)
          ? resp.empresas
          : (resp[0]?.empresas ?? []);

        this.empresasSeleccionadas = lista
          .map((e: Empresa) => e.id as number)
          .filter((id: number): id is number => id !== undefined);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener empresas del trabajador:', err);
        this.loading = false;
      }
    });
  }

  toggleEmpresa(id: number): void {
    if (this.empresasSeleccionadas.includes(id)) {
      this.empresasSeleccionadas = this.empresasSeleccionadas.filter(x => x !== id);
    } else {
      this.empresasSeleccionadas.push(id);
    }
  }

  guardarAsignacion(): void {
    this.loading = true;

    this._dataServices.asignarEmpresas(this.idTrabajador, this.empresasSeleccionadas).subscribe({
      next: () => {
        alert('Empresas asignadas correctamente');
        this.router.navigate(['/trabajadores']);
      },
      error: (err) => {
        console.error('Error al asignar empresas:', err);
        alert('Error al asignar empresas');
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/trabajadores']);
  }
}
