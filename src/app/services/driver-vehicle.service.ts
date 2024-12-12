import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DriverVehicle } from '../models/driver-vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class DriverVehicleService {

  constructor(private http: HttpClient) { }

  list(): Observable<DriverVehicle[]> {
    return this.http.get<DriverVehicle[]>(`${environment.MS_NEGOCIO}/driverVehicles`);
  }

  delete(id: number) {
    return this.http.delete<DriverVehicle>(`${environment.MS_NEGOCIO}/driverVehicles/${id}`); 
  }

  view(id: number): Observable<DriverVehicle> {
    return this.http.get<DriverVehicle>(`${environment.MS_NEGOCIO}/driverVehicles/${id}`);
  }

  create(driverVehicle: DriverVehicle): Observable<DriverVehicle> {
    return this.http.post<DriverVehicle>(`${environment.MS_NEGOCIO}/driverVehicles`, driverVehicle);
  }
  
  update(driverVehicle: DriverVehicle): Observable<DriverVehicle> {
    return this.http.put<DriverVehicle>(`${environment.MS_NEGOCIO}/driverVehicles/${driverVehicle.id}`, driverVehicle);
  }  
}