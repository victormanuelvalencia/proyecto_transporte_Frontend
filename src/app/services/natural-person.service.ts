import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NaturalPerson } from '../models/natural-person.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NaturalPersonService {

  constructor(private http:HttpClient) { }

  //El observable espera a que venga la peticion del microservicio
  list(): Observable<NaturalPerson[]> {
   //llamamos al servicio de negocio por medio de las variables de entorno
   return this.http.get<NaturalPerson[]>(`${environment.MS_NEGOCIO}/naturalPerson`);
 }

 view(id:number): Observable<NaturalPerson> {
   return this.http.get<NaturalPerson>(`${environment.MS_NEGOCIO}/naturalPerson/${id}`);
 }
 delete(id: number): Observable<NaturalPerson> {
   return this.http.delete<NaturalPerson>(`${environment.MS_NEGOCIO}/naturalPerson/${id}`);
 }

 create(naturalperson:NaturalPerson):Observable<NaturalPerson>{
   return this.http.post<NaturalPerson>(`${environment.MS_NEGOCIO}/naturalPerson`, naturalperson) //enviamos el body
 }

 update(naturalperson:NaturalPerson):Observable<NaturalPerson>{
   return this.http.put<NaturalPerson>(`${environment.MS_NEGOCIO}/naturalPerson/${naturalperson.id}`, naturalperson) //enviamos el body
 }
}
