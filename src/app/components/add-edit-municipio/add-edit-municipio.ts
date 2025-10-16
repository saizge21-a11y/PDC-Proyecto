import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataServices } from '../../services/data';
import { Municipio } from '../../interfaces/municipio';
import { Pais } from '../../interfaces/pais';
import { Departamento } from '../../interfaces/departamento';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";

@Component({
  selector: 'app-add-edit-municipio',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgFor, ProgressBar],
  templateUrl: './add-edit-municipio.html',
  styleUrl: './add-edit-municipio.css'
})
export class AddEditMunicipio {
  form: FormGroup;
  loading = false;
  operacion = 'Agregar';
  id: number = 0;

  listPaises: Pais[] = [];
  listDepartamentos: Departamento[] = [];
  departamentosFiltrados: Departamento[] = [];

  constructor(
    private fb: FormBuilder,
    private _dataServices: DataServices,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      id_pais: ['', Validators.required],
      id_departamento: ['', Validators.required]
    });
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getPaises();
    this.getDepartamentos();

    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getMunicipio(this.id);
    }

    this.form.get('id_pais')?.valueChanges.subscribe(idPais => {
      this.departamentosFiltrados = this.listDepartamentos.filter(
        dep => dep.id_pais === Number(idPais)
      );
      this.form.get('id_departamento')?.setValue('');
    });
  }

  getPaises() {
    this._dataServices.getListPaises().subscribe(data => {
      this.listPaises = data.listPais;
    });
  }

  getDepartamentos() {
    this._dataServices.getListDep().subscribe((data: any) => {
      this.listDepartamentos = data.listDepartamento;
    });
  }

  getMunicipio(id: number) {
    this.loading = true;
    this._dataServices.getMun(id).subscribe((data: Municipio) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        id_pais: data.id_pais, 
        id_departamento: data.id_departamento
      });
    });
  }

  addMunicipio() {
    const municipio: Municipio = {
      nombre: this.form.value.nombre,
      id_departamento: this.form.value.id_departamento
    };

    this.loading = true;

    if (this.id !== 0) {
      municipio.id = this.id;
      this._dataServices.updateMun(this.id, municipio).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/municipios']);
        this.toastr.info(
          `El municipio ${municipio.nombre} fue editado con éxito`,
          'Municipio Editado'
        );
      });
    } else {
      this._dataServices.saveMun(municipio).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/municipios']);
        this.toastr.success(
          `El municipio ${municipio.nombre} fue registrado con éxito`,
          'Municipio Registrado'
        );
      });
    }
  }
}
