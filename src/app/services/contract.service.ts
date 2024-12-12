import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http:HttpClient) { }

  //El observable espera a que venga la peticion del microservicio
  list(): Observable<Contract[]> {
   //llamamos al servicio de negocio por medio de las variables de entorno
   return this.http.get<Contract[]>(`${environment.MS_NEGOCIO}/Contracts`);
 }

 view(id:number): Observable<Contract> {
   return this.http.get<Contract>(`${environment.MS_NEGOCIO}/Contracts/${id}`);
 }
 delete(id: number): Observable<Contract> {
   return this.http.delete<Contract>(`${environment.MS_NEGOCIO}/Contracts/${id}`);
 }

 create(contract:Contract):Observable<Contract>{
   return this.http.post<Contract>(`${environment.MS_NEGOCIO}/Contracts`, contract) //enviamos el body
 }

 update(contract:Contract):Observable<Contract>{
   return this.http.put<Contract>(`${environment.MS_NEGOCIO}/Contracts/${contract.id}`, contract) //enviamos el body
 }
}
