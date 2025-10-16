import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pais } from '../../interfaces/pais';
import { NgIf } from "@angular/common";
import { DataServices } from '../../services/data';
import { ProgressBar } from "../../shared/progress-bar/progress-bar";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-data',
  imports: [RouterLink, ReactiveFormsModule, NgIf, ProgressBar],
  standalone: true,
  templateUrl: './add-edit-data.html',
  styleUrl: './add-edit-data.css'
})
export class AddEditData {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _dataServices: DataServices,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  addPais() {
    const pais: Pais = {
      nombre: this.form.value.name
    }
    this.loading = true;
    if (this.id !== 0) {

      pais.id = this.id;
      this._dataServices.updatePais(this.id, pais).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/paises']);
        this.toastr.info(`El país ${pais.nombre} fue editado con éxito`, 'País Editado');
      });
    } else {

      this._dataServices.savePais(pais).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/paises']);
        this.toastr.success(`El país ${pais.nombre} fue registrado con éxito`, 'País Registrado');
      });
    }

  }
  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getPais(this.id);
    }
  }

  getPais(id: number) {
    this.loading = true;
    this._dataServices.getPais(id).subscribe((data: Pais) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.nombre
      })
    })
  }
}