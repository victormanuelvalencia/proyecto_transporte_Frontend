import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DirListOrder } from '../models/dir_list_order.model';


@Injectable({
  providedIn: 'root'
})
export class dirlistorderservice {

  constructor(private http: HttpClient) { }

  list(): Observable<DirListOrder[]> {
    return this.http.get<DirListOrder[]>(`${environment.MS_NEGOCIO}/dirlistorders`);
  }

  delete(id: number) {
    return this.http.delete<DirListOrder>(`${environment.MS_NEGOCIO}/dirlistorders/${id}`); 
  }

  view(id: number): Observable<DirListOrder> {
    return this.http.get<DirListOrder>(`${environment.MS_NEGOCIO}/dirlistorders/${id}`);
  }

  create(dirlistorder: DirListOrder): Observable<DirListOrder> {
    return this.http.post<DirListOrder>(`${environment.MS_NEGOCIO}/dirlistorders`, dirlistorder);
  }
  
  update(dirlistorder: DirListOrder): Observable<DirListOrder> {
    return this.http.put<DirListOrder>(`${environment.MS_NEGOCIO}/dirlistorders/${dirlistorder.id}`, dirlistorder );
  }  
}
