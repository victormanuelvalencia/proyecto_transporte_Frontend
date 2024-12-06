import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  list(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.MS_NEGOCIO}/drivers`);
  }

  delete(id: number) {
    return this.http.delete<Driver>(`${environment.MS_NEGOCIO}/drivers/${id}`); 
  }

  view(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${environment.MS_NEGOCIO}/drivers/${id}`);
  }

  create(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${environment.MS_NEGOCIO}/drivers`, driver);
  }
  
  update(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${environment.MS_NEGOCIO}/drivers/${driver.id}`, driver);
  }  
}
