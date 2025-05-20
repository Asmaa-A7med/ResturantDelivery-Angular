import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResturantService } from '../../Services/resturant.service';
import { CityService } from '../../Services/city.service';
import { CityNames } from '../../models/City';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  restaurantName: string = '';
  selectedCity: string = '';
  showResults: boolean = true;

    cities: CityNames[] = [];
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];

  constructor(private router: Router,private resturantService:ResturantService,private cityService:CityService) {}

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe({
      next: (cities) => {
        this.cities = cities.map(city => ({ id: city.id, name: city.name }));
      },
      error: (err) => console.error('Error fetching cities:', err)
    });


    this.resturantService.getAllRestaurants().subscribe({
      next: (data) => {
        console.log('All restaurants:', data);
        this.restaurants = data;
        this.filteredRestaurants = data;
 
      },
      error: (err) => {
        console.error('Error fetching restaurants:', err);
      }
    });
  }

  onSearch() {
    console.log('Searching for:', this.restaurantName, 'in city:', this.selectedCity);
  
    this.resturantService.searchRestaurants(this.restaurantName, this.selectedCity).subscribe({
      next: (data) => {
        console.log('Search result:', data);
        this.filteredRestaurants = data;
        this.showResults = true;
      },
      error: (err) => {
        console.error('Error searching restaurants:', err);
      }
    });
  }
  
  

  viewMenu(restaurantId: number) {
    this.router.navigate(['/menu', restaurantId]);
  }
}
