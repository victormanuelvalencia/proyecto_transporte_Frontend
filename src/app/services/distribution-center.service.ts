import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistributionCenter } from '../models/distribution-center.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributionCenterService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<DistributionCenter[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<DistributionCenter[]>(`${environment.MS_NEGOCIO}/distributioncenters`);
  }

  view(id:number): Observable<DistributionCenter> {
    return this.http.get<DistributionCenter>(`${environment.MS_NEGOCIO}/distributioncenters/${id}`);
  }
  delete(id: number): Observable<DistributionCenter> {
    return this.http.delete<DistributionCenter>(`${environment.MS_NEGOCIO}/distributioncenters/${id}`);
  }

  create(distributioncenter:DistributionCenter):Observable<DistributionCenter>{
    return this.http.post<DistributionCenter>(`${environment.MS_NEGOCIO}/distributioncenters`, distributioncenter) //eviamos el body
  }

  update(distributioncenter:DistributionCenter):Observable<DistributionCenter>{
    return this.http.put<DistributionCenter>(`${environment.MS_NEGOCIO}/distributioncenters/${distributioncenter.id}`, distributioncenter) //eviamos el body
  }
}
