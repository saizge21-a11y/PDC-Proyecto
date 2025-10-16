export interface Empresa {
  id?: number;
  nit: string;
  razon_social: string;
  nombre_comercial?: string;
  telefono?: string;
  correo_electronico?: string;
  id_pais: number;
  id_departamento: number;
  id_municipio: number;
}
