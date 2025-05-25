import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menueItems';
import { ResturantService } from '../../Services/resturant.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [FormsModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  menuItems: MenuItem[] = [];
  hasSelectedItem: boolean = false;
  restaurantId=0;

  constructor(private menuService:ResturantService,private router: Router,public activateRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.activateRoute.snapshot.paramMap.get('id'));
 //   let restaurantId=this.activateRoute.params(data=>[]) ;  
    this.menuService.getMenuByRestaurantId(this.restaurantId).subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (err) => {
        console.error('error loading menue', err);
      }
    });
  }

  onSelectionChange(): void {
    this.hasSelectedItem = this.menuItems.some(item => item.selected);
  }

  goToNextPage(): void {
    const selectedItems = this.menuItems
    .filter(item => item.selected)
    .map(item => ({
      name: item.name,
      price: item.price,
       
    }));
    localStorage.setItem('cartItems', JSON.stringify(selectedItems));
    const filteredItems = this.menuItems.filter(item => item.selected);
    console.log('selected items :', filteredItems);
    this.router.navigate(['/reserve']);
}
goBack() {
  // Navigate back to the previous page :menue page 

  this.router.navigate(['/menu']);  
}
}