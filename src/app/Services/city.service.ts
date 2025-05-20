import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CityNames } from '../models/City';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  id!: number;
  name!: string;
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

   // Get all cities
   getAllCities(): Observable<CityNames[]> {
    return this.httpClient.get<CityNames[]>(`${this.apiUrl}/City/GetAll`);   
  }
}
