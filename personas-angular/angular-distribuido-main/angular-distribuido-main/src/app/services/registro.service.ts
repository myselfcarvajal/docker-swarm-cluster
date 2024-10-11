import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environments';

export interface Registro {
  id: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  sexo: string;
  fecha_nacimiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrlCrear = environment.apiUrlCrear;
  private apiUrlEliminar = environment.apiUrlEliminar;

  constructor(private http: HttpClient) {}

  crearRegistro(data: Omit<Registro, 'id'>): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrlCrear, data);
  }

  eliminarRegistro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlEliminar}/${id}`);
  }
}
