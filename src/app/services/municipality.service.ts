import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipality } from '../models/municipality.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Municipality[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Municipality[]>(`${environment.MS_NEGOCIO}/municipalities`);
  }

  view(id:number): Observable<Municipality> {
    return this.http.get<Municipality>(`${environment.MS_NEGOCIO}/municipalities/${id}`);
  }
  delete(id: number): Observable<Municipality> {
    return this.http.delete<Municipality>(`${environment.MS_NEGOCIO}/municipalities/${id}`);
  }

  create(municipality:Municipality):Observable<Municipality>{
    return this.http.post<Municipality>(`${environment.MS_NEGOCIO}/municipalities`, municipality) //eviamos el body
  }

  update(municipality:Municipality):Observable<Municipality>{
    return this.http.put<Municipality>(`${environment.MS_NEGOCIO}/municipalities/${municipality.id}`, municipality) //eviamos el body
  }
}
