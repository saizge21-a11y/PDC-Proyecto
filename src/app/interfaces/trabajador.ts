import { Empresa } from "./empresa";

export interface Trabajador {
  id?: number;
  nombre_completo: string;
  edad: number;
  telefono?: string;
  correo_electronico?: string;
  id_pais: number;
  id_departamento: number;
  id_municipio: number;
  id_empresa: number;

  empresas?: Empresa[];
}
