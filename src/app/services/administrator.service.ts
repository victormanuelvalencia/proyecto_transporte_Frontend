import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Administrator[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Administrator[]>(`${environment.MS_NEGOCIO}/administrators`);
  }

  view(id:number): Observable<Administrator> {
    return this.http.get<Administrator>(`${environment.MS_NEGOCIO}/administrators/${id}`);
  }
  delete(id: number): Observable<Administrator> {
    return this.http.delete<Administrator>(`${environment.MS_NEGOCIO}/administrators/${id}`);
  }

  create(administrator:Administrator):Observable<Administrator>{
    return this.http.post<Administrator>(`${environment.MS_NEGOCIO}/administrators`, administrator) //eviamos el body
  }

  update(administrator:Administrator):Observable<Administrator>{
    return this.http.put<Administrator>(`${environment.MS_NEGOCIO}/administrators/${administrator.id}`, administrator) //eviamos el body
  }
}
