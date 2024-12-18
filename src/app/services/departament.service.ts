import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departament } from '../models/departament.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Departament[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Departament[]>(`${environment.MS_NEGOCIO}/departaments`);
  }

  view(id:number): Observable<Departament> {
    return this.http.get<Departament>(`${environment.MS_NEGOCIO}/departaments/${id}`);
  }
  delete(id: number): Observable<Departament> {
    return this.http.delete<Departament>(`${environment.MS_NEGOCIO}/departaments/${id}`);
  }

  create(departament:Departament):Observable<Departament>{
    return this.http.post<Departament>(`${environment.MS_NEGOCIO}/departaments`, departament) //eviamos el body
  }

  update(departament:Departament):Observable<Departament>{
    return this.http.put<Departament>(`${environment.MS_NEGOCIO}/departaments/${departament.id}`, departament) //eviamos el body
  }
}
