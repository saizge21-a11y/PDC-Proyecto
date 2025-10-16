import { Routes } from '@angular/router';
import { Home } from './components/home/home';

// País
import { ListTable } from './components/list-table/list-table';
import { AddEditData } from './components/add-edit-data/add-edit-data';

// Departamento
import { ListTableDepartamento } from './components/list-table-departamento/list-table-departamento';
import { AddEditDepartamento } from './components/add-edit-departamento/add-edit-departamento';

// Municipio
import { ListTableMunicipio } from './components/list-table-municipio/list-table-municipio';
import { AddEditMunicipio } from './components/add-edit-municipio/add-edit-municipio';

// Empresa
import { ListTableEmpresa } from './components/list-table-empresa/list-table-empresa';
import { AddEditEmpresa } from './components/add-edit-empresa/add-edit-empresa';

//Trabajador 
import { ListTableTrabajador } from './components/list-table-trabajador/list-table-trabajador';
import { AddEditTrabajador } from './components/add-edit-trabajador/add-edit-trabajador';
import { AsignarEmpresaTrabajador } from './components/asignar-empresa-trabajador/asignar-empresa-trabajador';

export const routes: Routes = [
    { path: '', component: Home },

    // Pais
    { path: 'paises', component: ListTable },
    { path: 'paises/add', component: AddEditData },
    { path: 'paises/edit/:id', component: AddEditData },

    // Departamento
    { path: 'departamentos', component: ListTableDepartamento },
    { path: 'departamentos/add', component: AddEditDepartamento },
    { path: 'departamentos/edit/:id', component: AddEditDepartamento },

    // Municipio
    { path: 'municipios', component: ListTableMunicipio },
    { path: 'municipios/add', component: AddEditMunicipio },
    { path: 'municipios/edit/:id', component: AddEditMunicipio },

    // Empresa
    { path: 'empresas', component: ListTableEmpresa },
    { path: 'empresas/add', component: AddEditEmpresa },
    { path: 'empresas/edit/:id', component: AddEditEmpresa },

    // Trabjador
    { path: 'trabajadores', component: ListTableTrabajador },
    { path: 'trabajadores/add', component: AddEditTrabajador },
    { path: 'trabajadores/edit/:id', component: AddEditTrabajador },

    { path: 'trabajadores/asignar/:id', component: AsignarEmpresaTrabajador },



    { path: '**', redirectTo: '', pathMatch: 'full' },

];
