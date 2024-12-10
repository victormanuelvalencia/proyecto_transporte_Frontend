import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from '../models/lot.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient) { }

  list(): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${environment.MS_NEGOCIO}/Lots`);
  }

  delete(id: number) {
    return this.http.delete<Lot>(`${environment.MS_NEGOCIO}/Lots/${id}`); 
  }

  view(id: number): Observable<Lot> {
    return this.http.get<Lot>(`${environment.MS_NEGOCIO}/Lots/${id}`);
  }

  create(lot: Lot): Observable<Lot> {
    return this.http.post<Lot>(`${environment.MS_NEGOCIO}/Lots`, lot);
  }
  
  update(lot: Lot): Observable<Lot> {
    return this.http.put<Lot>(`${environment.MS_NEGOCIO}/Lots/${lot.id}`, lot);
  }  
}
