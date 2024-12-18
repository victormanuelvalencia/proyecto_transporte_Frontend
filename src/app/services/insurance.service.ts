import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../models/insurance.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient) { }

    list(): Observable<Insurance[]> {
      return this.http.get<Insurance[]>(`${environment.MS_NEGOCIO}/insurances`);
    }
}
