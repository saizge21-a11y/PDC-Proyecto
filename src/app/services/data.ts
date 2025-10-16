import { ListTableMunicipio } from './../components/list-table-municipio/list-table-municipio';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';
import { Departamento } from '../interfaces/departamento';
import { Municipio } from '../interfaces/municipio';
import { Empresa } from '../interfaces/empresa';
import { Trabajador } from '../interfaces/trabajador';

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrlDep: string;
  private myApiUrlMun: string;
  private myApiUrlEm: string;
  private myApiUrlTr: string;
  private myApiUrlAsig: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/pais/';
    this.myApiUrlDep = 'api/departamento/';
    this.myApiUrlMun = 'api/municipio/';
    this.myApiUrlEm = 'api/empresa/';
    this.myApiUrlTr = 'api/trabajador/';
    this.myApiUrlAsig = 'api/empresa-trabajador/'; 
  }

  // --- País ---
  getListPaises(): Observable<{ listPais: Pais[] }> {
    return this.http.get<{ listPais: Pais[] }>(this.myAppUrl + this.myApiUrl);
  }

  deletePais(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  savePais(pais: Pais): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, pais);
  }

  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(this.myAppUrl + this.myApiUrl + id);
  }

  updatePais(id: number, pais: Pais): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, pais);
  }

  // --- Departamento ---
  getListDep(): Observable<{ listDepartamento: Departamento[] }> {
    return this.http.get<{ listDepartamento: Departamento[] }>(this.myAppUrl + this.myApiUrlDep);
  }


  deleteDep(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrlDep + id);
  }

  saveDep(departamento: Departamento): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrlDep, departamento);
  }

  getDep(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(this.myAppUrl + this.myApiUrlDep + id);
  }

  updateDep(id: number, departamento: Departamento): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrlDep + id, departamento);
  }

  // --- Municipio ---
  getListMun(): Observable<{ listMunicipio: Municipio[] }> {
    return this.http.get<{ listMunicipio: Municipio[] }>(this.myAppUrl + this.myApiUrlMun);
  }


  deleteMun(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrlMun + id);
  }

  saveMun(municipio: Municipio): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrlMun, municipio);
  }

  getMun(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(this.myAppUrl + this.myApiUrlMun + id);
  }

  updateMun(id: number, municipio: Municipio): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrlMun + id, municipio);
  }

  // --- Empresa ---
  getListEm(): Observable<{ listEmpresas: Empresa[] }> {
    return this.http.get<{ listEmpresas: Empresa[] }>(this.myAppUrl + this.myApiUrlEm);
  }


  deleteEm(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrlEm + id);
  }

  saveEm(empresa: Empresa): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrlEm, empresa);
  }

  getEm(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(this.myAppUrl + this.myApiUrlEm + id);
  }

  updateEm(id: number, empresa: Empresa): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrlEm + id, empresa);
  }// --- Trabajador ---
  getListTrabajador(): Observable<{ listTrabajadores: Trabajador[] }> {
    return this.http.get<{ listTrabajadores: Trabajador[] }>(this.myAppUrl + this.myApiUrlTr);
  }

  getTrabajador(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(this.myAppUrl + this.myApiUrlTr + id);
  }

  saveTrabajador(trabajador: Trabajador): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrlTr, trabajador);
  }

  updateTrabajador(id: number, trabajador: Trabajador): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrlTr + id, trabajador);
  }

  deleteTrabajador(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrlTr + id);

  }

  // Asignar empresas a trabajador
  asignarEmpresas(idTrabajador: number, empresasIds: number[]): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrlAsig}${idTrabajador}`, { empresasIds });
  }

  // Obtener empresas de un trabajador
  getEmpresasPorTrabajador(idTrabajador: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrlAsig}${idTrabajador}`);
  }

  getEmpresasFiltradas(idPais: number, idDepartamento: number, idMunicipio: number) {
  return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}empresa/filtrar`, {
    params: {
      id_pais: idPais,
      id_departamento: idDepartamento,
      id_municipio: idMunicipio
    }
  });
}


}

