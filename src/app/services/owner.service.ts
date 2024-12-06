import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.MS_NEGOCIO}/owners`);
  }

  delete(id: number) {
    return this.http.delete<Owner>(`${environment.MS_NEGOCIO}/owners/${id}`); 
  }

  view(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${environment.MS_NEGOCIO}/owners/${id}`);
  }

  create(owner: Owner): Observable<Expense> {
    return this.http.post<Expense>(`${environment.MS_NEGOCIO}/owners`, owner);
  }
  
  update(owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(`${environment.MS_NEGOCIO}/owners/${owner.id}`, owner);
  }  
}
