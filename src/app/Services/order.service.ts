import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7007/api/Confirmation';
    constructor(private http: HttpClient) { }
     checkout(order: any) {
    return this.http.post(`${this.apiUrl}/checkout`, order);
     }
}
