import { Injectable } from '@angular/core';
import { OwnerVehicle } from '../models/owner-vehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerVehicleService {

  constructor(private http: HttpClient) { }

  list(): Observable<OwnerVehicle[]> {
    return this.http.get<OwnerVehicle[]>(`${environment.MS_NEGOCIO}/ownerVehicles`);
  }

  delete(id: number) {
    return this.http.delete<OwnerVehicle>(`${environment.MS_NEGOCIO}/ownerVehicles/${id}`); 
  }
  
  view(id: number): Observable<OwnerVehicle> {
    return this.http.get<OwnerVehicle>(`${environment.MS_NEGOCIO}/ownerVehicles/${id}`);
  }
  
  create(OwnerVehicle: OwnerVehicle): Observable<OwnerVehicle> {
    return this.http.post<OwnerVehicle>(`${environment.MS_NEGOCIO}/ownerVehicles`, OwnerVehicle);
  }
  
  update(OwnerVehicle: OwnerVehicle): Observable<OwnerVehicle> {
    return this.http.put<OwnerVehicle>(`${environment.MS_NEGOCIO}/ownerVehicles/${OwnerVehicle.id}`, OwnerVehicle);
  }  
}