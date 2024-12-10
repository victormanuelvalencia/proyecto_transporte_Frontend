import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.MS_NEGOCIO}/Products`);
  }

  delete(id: number) {
    return this.http.delete<Product>(`${environment.MS_NEGOCIO}/Products/${id}`); 
  }

  view(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.MS_NEGOCIO}/Products/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.MS_NEGOCIO}/Products`, product);
  }
  
  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.MS_NEGOCIO}/Products/${product.id}`, product);
  }  
}