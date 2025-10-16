import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataServices } from '../../services/data';
import { ToastrService } from 'ngx-toastr';
import { NgIf, NgFor } from '@angular/common';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { Trabajador } from '../../interfaces/trabajador';
import { Empresa } from '../../interfaces/empresa';

@Component({
  selector: 'app-add-edit-trabajador',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgFor, ProgressBar],
  templateUrl: './add-edit-trabajador.html',
  styleUrls: ['./add-edit-trabajador.css']
})
export class AddEditTrabajador {
  form: FormGroup;
  loading = false;
  id: number;
  operacion = 'Agregar Trabajador';

  listPaises: any[] = [];
  listDepartamentos: any[] = [];
  listMunicipios: any[] = [];
  listEmpresas: Empresa[] = [];

  constructor(
    private fb: FormBuilder,
    private _dataServices: DataServices,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      nombre_completo: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      id_pais: ['', Validators.required],
      id_departamento: ['', Validators.required],
      id_municipio: ['', Validators.required],
      id_empresa: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getListPaises();

    if (this.id !== 0) {
      this.operacion = 'Editar Trabajador';
      this.getTrabajador(this.id);
    }

    this.form.get('id_pais')?.valueChanges.subscribe(() => {
      this.onPaisChange();
    });

    this.form.get('id_departamento')?.valueChanges.subscribe(() => {
      this.onDepartamentoChange();
    });

    this.form.get('id_municipio')?.valueChanges.subscribe(() => {
      this.loadEmpresas();
    });
  }

  getListPaises() {
    this._dataServices.getListPaises().subscribe((data) => {
      this.listPaises = data.listPais;
    });
  }

  onPaisChange() {
    const idPais = this.form.value.id_pais;
    this._dataServices.getListDep().subscribe((data) => {
      this.listDepartamentos = data.listDepartamento.filter(
        (d: any) => d.id_pais === Number(idPais)
      );
    });
    this.listMunicipios = [];
    this.form.patchValue({ id_departamento: '', id_municipio: '', id_empresa: '' });
  }

  onDepartamentoChange() {
    const idDepto = this.form.value.id_departamento;
    this._dataServices.getListMun().subscribe((data) => {
      this.listMunicipios = data.listMunicipio.filter(
        (m: any) => m.id_departamento === Number(idDepto)
      );
    });
    this.form.patchValue({ id_municipio: '', id_empresa: '' });
  }

  loadEmpresas() {
    const { id_pais, id_departamento, id_municipio } = this.form.value;
    this._dataServices.getListEm().subscribe({
      next: (data) => {
        this.listEmpresas = data.listEmpresas.filter((e: any) =>
          e.id_pais == id_pais &&
          e.id_departamento == id_departamento &&
          e.id_municipio == id_municipio
        );

      },
      error: (err) => console.error('Error cargando empresas', err),
    });
  }


   getTrabajador(id: number) {
    this.loading = true;
    this._dataServices.getTrabajador(id).subscribe({
      next: (data: Trabajador) => {
        this.form.patchValue(data);
        this.loading = false;
        this.loadEmpresas();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  addTrabajador() {
    if (this.form.invalid) return;

    const trabajador: Trabajador = this.form.value;
    this.loading = true;

    if (this.id !== 0) {
      trabajador.id = this.id;
      this._dataServices.updateTrabajador(this.id, trabajador).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/trabajadores']);
          this.toastr.info(`Trabajador ${trabajador.nombre_completo} actualizado`, 'Trabajador Editado');
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this._dataServices.saveTrabajador(trabajador).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/trabajadores']);
          this.toastr.success(`Trabajador ${trabajador.nombre_completo} registrado`, 'Trabajador Registrado');
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }
}
