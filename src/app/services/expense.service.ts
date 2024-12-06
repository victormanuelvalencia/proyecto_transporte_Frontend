import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  list(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.MS_NEGOCIO}/expenses`);
  }

  delete(id: number) {
    return this.http.delete<Expense>(`${environment.MS_NEGOCIO}/expenses/${id}`); 
  }

  view(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${environment.MS_NEGOCIO}/expenses/${id}`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.MS_NEGOCIO}/expenses`, expense);
  }
  
  update(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${environment.MS_NEGOCIO}/expenses/${expense.id}`, expense);
  }  
}
