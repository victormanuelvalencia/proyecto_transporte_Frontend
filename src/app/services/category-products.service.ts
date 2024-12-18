import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProducts } from '../models/category-products.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {

  constructor(private http:HttpClient) { }

   //El observable espera a que venga la peticion del microservicio
   list(): Observable<CategoryProducts[]> {
    //llamamos al servicio de negocio por medio de las variables de entorno
    return this.http.get<CategoryProducts[]>(`${environment.MS_NEGOCIO}/category-products`);
  }

  view(id:number): Observable<CategoryProducts> {
    return this.http.get<CategoryProducts>(`${environment.MS_NEGOCIO}/category-products/${id}`);
  }
  delete(id: number): Observable<CategoryProducts> {
    return this.http.delete<CategoryProducts>(`${environment.MS_NEGOCIO}/category-products/${id}`);
  }

  create(categoryproducts:CategoryProducts):Observable<CategoryProducts>{
    return this.http.post<CategoryProducts>(`${environment.MS_NEGOCIO}/categoryproducts`, categoryproducts) //eviamos el body
  }

  update(categoryproducts:CategoryProducts):Observable<CategoryProducts>{
    return this.http.put<CategoryProducts>(`${environment.MS_NEGOCIO}/categoryproducts/${categoryproducts.id}`, categoryproducts) //eviamos el body
  }
}
