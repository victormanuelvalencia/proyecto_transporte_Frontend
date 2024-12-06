import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {}
  
  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.MS_NEGOCIO}/services`);
  }
  
  delete(id: number) {
    return this.http.delete<Service>(`${environment.MS_NEGOCIO}/services/${id}`); 
  }
  
  view(id: number): Observable<Service> {
    return this.http.get<Service>(`${environment.MS_NEGOCIO}/services/${id}`);
  }
  
  create(service: Service): Observable<Service> {
    return this.http.post<Service>(`${environment.MS_NEGOCIO}/services`, service);
  }
    
  update(service: Service): Observable<Service> {
    return this.http.put<Service>(`${environment.MS_NEGOCIO}/services/${service.id}`, service);
  }  
}
