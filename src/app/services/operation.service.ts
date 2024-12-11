import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  list(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.MS_NEGOCIO}/operations`);
  }

  delete(id: number) {
    return this.http.delete<Operation>(`${environment.MS_NEGOCIO}/operations/${id}`); 
  }

  view(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${environment.MS_NEGOCIO}/operations/${id}`);
  }

  create(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(`${environment.MS_NEGOCIO}/operations`, operation);
  }
  
  update(operation: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${environment.MS_NEGOCIO}/operations/${operation.id}`, operation);
  }  
}
