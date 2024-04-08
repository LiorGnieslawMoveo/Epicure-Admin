import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.scss'
})

export class AdminpageComponent {
  constructor(private router: Router) { }

  navToDishTable(): void {
    this.router.navigate(['/dishes']);
  }
  navToChefTable(): void {
    this.router.navigate(['/chefs']);
  }
  navToRestaurantTable(): void {
    this.router.navigate(['/restaurants']);
  }
}
