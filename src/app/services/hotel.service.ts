import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Hotel[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Hotel[]>(`${environment.MS_NEGOCIO}/hotels`);
  }

  view(id:number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.MS_NEGOCIO}/hotels/${id}`);
  }
  delete(id: number): Observable<Hotel> {
    return this.http.delete<Hotel>(`${environment.MS_NEGOCIO}/hotels/${id}`);
  }

  create(hotel:Hotel):Observable<Hotel>{
    return this.http.post<Hotel>(`${environment.MS_NEGOCIO}/hotels`, hotel) //eviamos el body
  }

  update(hotel:Hotel):Observable<Hotel>{
    return this.http.put<Hotel>(`${environment.MS_NEGOCIO}/hotels/${hotel.id}`, hotel) //eviamos el body
  }
}
