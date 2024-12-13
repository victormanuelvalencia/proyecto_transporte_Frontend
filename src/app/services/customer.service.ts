import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Customer[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Customer[]>(`${environment.MS_NEGOCIO}/customers`);
  }

  view(id:number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.MS_NEGOCIO}/customers/${id}`);
  }
  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.MS_NEGOCIO}/customers/${id}`);
  }

  create(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${environment.MS_NEGOCIO}/customers`, customer) //eviamos el body
  }

  update(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${environment.MS_NEGOCIO}/customers/${customer.id}`, customer) //eviamos el body
  }
}
