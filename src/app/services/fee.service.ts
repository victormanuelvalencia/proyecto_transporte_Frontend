import { Injectable } from '@angular/core';
import { Fee } from '../models/fee.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Fee[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Fee[]>(`${environment.MS_NEGOCIO}/fees`);
  }

  view(id:number): Observable<Fee> {
    return this.http.get<Fee>(`${environment.MS_NEGOCIO}/fees/${id}`);
  }
  delete(id: number): Observable<Fee> {
    return this.http.delete<Fee>(`${environment.MS_NEGOCIO}/fees/${id}`);
  }

  create(fee:Fee):Observable<Fee>{
    return this.http.post<Fee>(`${environment.MS_NEGOCIO}/fees`, fee) //eviamos el body
  }

  update(fee:Fee):Observable<Fee>{
    return this.http.put<Fee>(`${environment.MS_NEGOCIO}/fees/${fee.id}`, fee) //eviamos el body
  }
}
