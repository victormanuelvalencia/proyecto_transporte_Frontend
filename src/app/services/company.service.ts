import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Company[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Company[]>(`${environment.MS_NEGOCIO}/companies`);
  }

  view(id:number): Observable<Company> {
    return this.http.get<Company>(`${environment.MS_NEGOCIO}/companies/${id}`);
  }
  delete(id: number): Observable<Company> {
    return this.http.delete<Company>(`${environment.MS_NEGOCIO}/companies/${id}`);
  }

  create(company:Company):Observable<Company>{
    return this.http.post<Company>(`${environment.MS_NEGOCIO}/companies`, company) //eviamos el body
  }

  update(company:Company):Observable<Company>{
    return this.http.put<Company>(`${environment.MS_NEGOCIO}/companies/${company.id}`, company) //eviamos el body
  }
}
