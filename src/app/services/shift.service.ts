import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Shift[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Shift[]>(`${environment.MS_NEGOCIO}/shifts`);
  }

  view(id:number): Observable<Shift> {
    return this.http.get<Shift>(`${environment.MS_NEGOCIO}/shifts/${id}`);
  }
  delete(id: number): Observable<Shift> {
    return this.http.delete<Shift>(`${environment.MS_NEGOCIO}/shifts/${id}`);
  }

  create(shift:Shift):Observable<Shift>{
    return this.http.post<Shift>(`${environment.MS_NEGOCIO}/shifts`, shift) //eviamos el body
  }

  update(shift:Shift):Observable<Shift>{
    return this.http.put<Shift>(`${environment.MS_NEGOCIO}/shifts/${shift.id}`, shift) //eviamos el body
  }
}
