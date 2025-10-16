import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataServices } from '../../services/data';
import { Empresa } from '../../interfaces/empresa';
import { Pais } from '../../interfaces/pais';
import { Departamento } from '../../interfaces/departamento';
import { Municipio } from '../../interfaces/municipio';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-add-edit-empresa',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgFor, ProgressBar],
  templateUrl: './add-edit-empresa.html',
  styleUrl: './add-edit-empresa.css'
})
export class AddEditEmpresa {
  form: FormGroup;
  loading = false;
  id = 0;
  operacion = 'Agregar';

  listPaises: Pais[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];

  departamentosFiltrados: Departamento[] = [];
  municipiosFiltrados: Municipio[] = [];

  constructor(
    private fb: FormBuilder,
    private _dataServices: DataServices,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nit: ['', Validators.required],
      razon_social: ['', Validators.required],
      nombre_comercial: [''],
      telefono: [''],
      correo_electronico: ['', Validators.email],
      id_pais: ['', Validators.required],
      id_departamento: ['', Validators.required],
      id_municipio: ['', Validators.required]
    });
    const param = this.aRouter.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : 0;
  }

  ngOnInit(): void {
    this.getPaises();
    this.getDepartamentos();
    this.getMunicipios();

    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getEmpresa(this.id);
    }

    this.form.get('id_pais')?.valueChanges.subscribe((idPais) => {
      this.departamentosFiltrados = this.listDepartamentos.filter(d => d.id_pais === Number(idPais));
      this.form.get('id_departamento')?.setValue('');
      this.municipiosFiltrados = [];
    });

    this.form.get('id_departamento')?.valueChanges.subscribe((idDepto) => {
      this.municipiosFiltrados = this.listMunicipios.filter(m => m.id_departamento === Number(idDepto));
      this.form.get('id_municipio')?.setValue('');
    });
  }

  getPaises() {
    this._dataServices.getListPaises().subscribe((data: any) => {
      this.listPaises = Array.isArray(data) ? data : (data.listPais ?? data);
    });
  }
  getDepartamentos() {
    this._dataServices.getListDep().subscribe((data: any) => {
      this.listDepartamentos = Array.isArray(data) ? data : (data.listDepartamento ?? data);
    });
  }
  getMunicipios() {
    this._dataServices.getListMun().subscribe((data: any) => {
      this.listMunicipios = Array.isArray(data) ? data : (data.listMunicipio ?? data);
    });
  }

  getEmpresa(id: number) {
    this.loading = true;
    this._dataServices.getEm(id).subscribe({
      next: (data: Empresa) => {
        this.loading = false;
        this.form.patchValue({
          nit: data.nit,
          razon_social: data.razon_social,
          nombre_comercial: data.nombre_comercial ?? '',
          telefono: data.telefono ?? '',
          correo_electronico: data.correo_electronico ?? '',
          id_pais: data.id_pais,
          id_departamento: data.id_departamento,
          id_municipio: data.id_municipio
        });
        this.departamentosFiltrados = this.listDepartamentos.filter(d => d.id_pais === data.id_pais);
        this.municipiosFiltrados = this.listMunicipios.filter(m => m.id_departamento === data.id_departamento);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  addEmpresa() {
    if (this.form.invalid) return;

    const empresa: Empresa = {
      nit: this.form.value.nit,
      razon_social: this.form.value.razon_social,
      nombre_comercial: this.form.value.nombre_comercial,
      telefono: this.form.value.telefono,
      correo_electronico: this.form.value.correo_electronico,
      id_pais: Number(this.form.value.id_pais),
      id_departamento: Number(this.form.value.id_departamento),
      id_municipio: Number(this.form.value.id_municipio)
    };

    this.loading = true;

    if (this.id !== 0) {
      empresa.id = this.id;
      this._dataServices.updateEm(this.id, empresa).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/empresas']);
          this.toastr.info(`Empresa ${empresa.razon_social} actualizada`, 'Empresa Editada');
        },
        error: (err) => { console.error(err); this.loading = false; }
      });
    } else {
      this._dataServices.saveEm(empresa).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/empresas']);
          this.toastr.success(`Empresa ${empresa.razon_social} registrada`, 'Empresa Registrada');
        },
        error: (err) => { console.error(err); this.loading = false; }
      });
    }
  }
}
