import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Restaurant[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Restaurant[]>(`${environment.MS_NEGOCIO}/restaurants`);
  }

  view(id:number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${environment.MS_NEGOCIO}/restaurants/${id}`);
  }
  delete(id: number): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${environment.MS_NEGOCIO}/restaurants/${id}`);
  }

  create(restaurant:Restaurant):Observable<Restaurant>{
    return this.http.post<Restaurant>(`${environment.MS_NEGOCIO}/restaurants`, restaurant) //eviamos el body
  }

  update(restaurant:Restaurant):Observable<Restaurant>{
    return this.http.put<Restaurant>(`${environment.MS_NEGOCIO}/restaurants/${restaurant.id}`, restaurant) //eviamos el body
  }
}
