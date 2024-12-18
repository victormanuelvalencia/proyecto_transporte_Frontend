import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance } from '../models/insurance.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Insurance[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Insurance[]>(`${environment.MS_NEGOCIO}/insurances`);
  }

  view(id:number): Observable<Insurance> {
    return this.http.get<Insurance>(`${environment.MS_NEGOCIO}/insurances/${id}`);
  }
  delete(id: number): Observable<Insurance> {
    return this.http.delete<Insurance>(`${environment.MS_NEGOCIO}/insurances/${id}`);
  }

  create(insurance:Insurance):Observable<Insurance>{
    return this.http.post<Insurance>(`${environment.MS_NEGOCIO}/insurances`, insurance) //eviamos el body
  }

  update(insurance:Insurance):Observable<Insurance>{
    return this.http.put<Insurance>(`${environment.MS_NEGOCIO}/insurances/${insurance.id}`, insurance) //eviamos el body
  }
}
