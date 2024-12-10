import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecAddress } from '../models/sec_address.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SecAddressService {

  constructor(private http: HttpClient) { }

  list(): Observable<SecAddress[]> {
    return this.http.get<SecAddress[]>(`${environment.MS_NEGOCIO}/secaddresses`);
  }

  delete(id: number) {
    return this.http.delete<SecAddress>(`${environment.MS_NEGOCIO}/secaddresses/${id}`); 
  }

  view(id: number): Observable<SecAddress> {
    return this.http.get<SecAddress>(`${environment.MS_NEGOCIO}/secaddresses/${id}`);
  }

  create(secAddress: SecAddress): Observable<SecAddress> {
    return this.http.post<SecAddress>(`${environment.MS_NEGOCIO}/secaddresses`, secAddress);
  }
  
  update(secAddress: SecAddress): Observable<SecAddress> {
    return this.http.put<SecAddress>(`${environment.MS_NEGOCIO}/secaddresses/${secAddress.id}`, secAddress);
  }  
}
