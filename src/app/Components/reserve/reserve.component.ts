import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent implements OnInit {

  reservation = {
    name: '',
    phone: '',
    email: '',
    address: ''
  };
  itemId: string | null = null; 

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
   
    this.itemId = this.route.snapshot.paramMap.get('id');
  }
  onSubmit() {
    if (this.isFormValid()) {
      localStorage.setItem('reservationData', JSON.stringify(this.reservation));
      if (this.itemId) {
        localStorage.setItem('selectedItemId', this.itemId);
      }
      console.log('Reservation data:', this.reservation);
      alert('Reservation confirmed!');
      this.router.navigate(['/confirm']);
      
    }
  }

  goBack() {
    if (this.itemId) {
      this.router.navigate(['/menu', this.itemId]);   
    } else {
      this.router.navigate(['/menu']); 
  }
  }
  isFormValid(): boolean {
    const { name, phone, email, address } = this.reservation;
    return !!(name && phone && email && address);
  }
}