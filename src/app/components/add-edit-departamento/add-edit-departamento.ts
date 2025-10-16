import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Departamento } from '../../interfaces/departamento';
import { Pais } from '../../interfaces/pais';
import { NgFor, NgIf } from '@angular/common';
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-departamento',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, ProgressBar,NgFor],
  templateUrl: './add-edit-departamento.html',
  styleUrl: './add-edit-departamento.css'
})
export class AddEditDepartamento {
  form: FormGroup;
  loading = false;
  id: number;
  operacion = 'Agregar';
  listPaises: Pais[] = [];

  constructor(
    private fb: FormBuilder,
    private _dataServices: DataServices,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      id_pais: ['', Validators.required]
    });
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
   this.getPaises();

    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getDep(this.id);
    }
  }

 
getPaises() {
  this.loading = true;
  this._dataServices.getListPaises().subscribe({
    next: (data: any) => {
      console.log('Respuesta raw GET /api/pais ->', data);

      if (Array.isArray(data)) {
        this.listPaises = data;
      } else if (data.listPais) {
        this.listPaises = data.listPais;
      } else if (data.paises) {
        this.listPaises = data.paises;
      } else if (data.data) {
        this.listPaises = data.data;
      } else {
        const firstArray = Object.values(data).find(v => Array.isArray(v));
        this.listPaises = firstArray ? (firstArray as any[]) : [];
      }

      console.log('Lista de países procesada ->', this.listPaises);
      this.loading = false;
    },
    error: err => {
      console.error('Error al cargar países', err);
      this.loading = false;
    }
  });
}

  addDep() {
    const departamento: Departamento = {
      nombre: this.form.value.name,
      id_pais: this.form.value.id_pais
    };

    this.loading = true;

    if (this.id !== 0) {
      departamento.id = this.id;
      this._dataServices.updateDep(this.id, departamento).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/departamentos']);
        this.toastr.info(
          `El departamento ${departamento.nombre} fue editado con éxito`,
          'Departamento Editado'
        );
      });
    } else {
      this._dataServices.saveDep(departamento).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/departamentos']);
        this.toastr.success(
          `El departamento ${departamento.nombre} fue registrado con éxito`,
          'Departamento Registrado'
        );
      });
    }
  }

  getDep(id: number) {
    this.loading = true;
    this._dataServices.getDep(id).subscribe((data: Departamento) => {
      this.loading = false;
      this.form.setValue({
        name: data.nombre,
        id_pais: data.id_pais
      });
    });
  }
}
