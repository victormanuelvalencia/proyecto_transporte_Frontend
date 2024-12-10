import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rute } from '../models/rute.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuteService {
  constructor(private http:HttpClient) { }

  //El observable espera a que venga la peticion del microservicio
  list(): Observable<Rute[]> {
   //llamamos al servicio de negocio por medio de las variables de entorno
   return this.http.get<Rute[]>(`${environment.MS_NEGOCIO}/rutes`);
 }

 view(id:number): Observable<Rute> {
   return this.http.get<Rute>(`${environment.MS_NEGOCIO}/rutes/${id}`);
 }
 delete(id: number): Observable<Rute> {
   return this.http.delete<Rute>(`${environment.MS_NEGOCIO}/rutes/${id}`);
 }

 create(rute:Rute):Observable<Rute>{
   return this.http.post<Rute>(`${environment.MS_NEGOCIO}/rutes`, rute) //eviamos el body
 }

 update(rute:Rute):Observable<Rute>{
   return this.http.put<Rute>(`${environment.MS_NEGOCIO}/rutes/${rute.id}`, rute) //eviamos el body
 }
}
