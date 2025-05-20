import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SearchRestaurant } from '../models/Resturant';
import { MenuItem } from '../models/menueItems';

@Injectable({
  providedIn: 'root'
})
export class ResturantService {

  constructor(private httpClient : HttpClient) { }
  private apiUrl = environment.apiUrl;

  // Get all restaurants
  getAllRestaurants(): Observable<SearchRestaurant[]> {
    return this.httpClient.get<SearchRestaurant[]>(`${this.apiUrl}/Resturant/GetAll`);
  }

  // search restaurants :
  searchRestaurants(name?: string, cityName?: string): Observable<SearchRestaurant[]> {
    return this.httpClient.get<SearchRestaurant[]>(`${this.apiUrl}/Resturant/SearchResturant?name=${name}&cityName=${cityName}`);
  }

  // menue items :
  getMenuByRestaurantId(restaurantId: number): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(`${this.apiUrl}/Resturant/${restaurantId}/MenuItems`);
  }
  
}

