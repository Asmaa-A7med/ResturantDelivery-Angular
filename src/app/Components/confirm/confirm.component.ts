import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{
  reservationData: any;
  cartItems: any[] = []; 
  ngOnInit() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems).map((item: any) => ({
        ...item,
        quantity: item.quantity && !isNaN(item.quantity) ? Number(item.quantity) : 1,
        price: item.price ? Number(item.price) : 0,
        imageUrl: item.imageUrl || 'assets/imgs/item.jpg'  
      }));
    }

    const storedReservation = localStorage.getItem('reservationData');
    if (storedReservation) {
      this.reservationData = JSON.parse(storedReservation);
    }
  }
  

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
}

removeItem(item: any) {
  const index = this.cartItems.indexOf(item);
  if (index !== -1) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); 
  }
}

getSubtotal(): number {
  return this.cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);
}

 
goBack() {
  history.back();
}
checkout() {
  
  localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  //  SweetAlert
  Swal.fire({
    title: 'Reservation Confirmed!',
    text: 'Your reservation and order have been placed. It will arrive as soon as possible.',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#ffc107'
  });
}


}