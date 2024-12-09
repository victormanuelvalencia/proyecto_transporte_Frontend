import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Facture[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Facture[]>(`${environment.MS_NEGOCIO}/factures`);
  }

  view(id:number): Observable<Facture> {
    return this.http.get<Facture>(`${environment.MS_NEGOCIO}/factures/${id}`);
  }
  delete(id: number): Observable<Facture> {
    return this.http.delete<Facture>(`${environment.MS_NEGOCIO}/factures/${id}`);
  }

  create(facture:Facture):Observable<Facture>{
    return this.http.post<Facture>(`${environment.MS_NEGOCIO}/factures`, facture) //eviamos el body
  }

  update(facture:Facture):Observable<Facture>{
    return this.http.put<Facture>(`${environment.MS_NEGOCIO}/factures/${facture.id}`, facture) //eviamos el body
  }
}
