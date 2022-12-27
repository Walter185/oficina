import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServeUrl='http://localhost:8080/stockbay/product';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServeUrl}/all`);
  }

  public addProduct(product: Product): Observable<Product> {
   return this.http.post<Product>(`${this.apiServeUrl}/add`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
   return this.http.put<Product>(`${this.apiServeUrl}/update`, product);
  }

  public deleteProduct(productId: number): Observable<void> {
   return this.http.delete<void>(`${this.apiServeUrl}/delete/${productId}`);
  }
}
