import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  list(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.MS_NEGOCIO}/vehicles`);
  }

  delete(id: number) {
    return this.http.delete<Vehicle>(`${environment.MS_NEGOCIO}/vehicles/${id}`); 
  }

  view(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.MS_NEGOCIO}/vehicles/${id}`);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.MS_NEGOCIO}/vehicles`, vehicle);
  }
  
  update(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.MS_NEGOCIO}/vehicles/${vehicle.id}`, vehicle);
  }  
}  