import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<Category[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<Category[]>(`${environment.MS_NEGOCIO}/categories`);
  }

  view(id:number): Observable<Category> {
    return this.http.get<Category>(`${environment.MS_NEGOCIO}/categories/${id}`);
  }
  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${environment.MS_NEGOCIO}/categories/${id}`);
  }

  create(category:Category):Observable<Category>{
    return this.http.post<Category>(`${environment.MS_NEGOCIO}/categories`, category) //eviamos el body
  }

  update(category:Category):Observable<Category>{
    return this.http.put<Category>(`${environment.MS_NEGOCIO}/categories/${category.id}`, category) //eviamos el body
  }
}
