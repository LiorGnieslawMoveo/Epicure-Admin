import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantsService } from '../../services/restaurant.service';
import { IRestaurant } from '../../interfaces/data.interface';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})

export class GenericModalComponent implements OnInit {
  formData: any;
  addDataFunction: (formData: any) => void;
  restaurants: IRestaurant[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantsService
  ) {
    this.formData = data && data.formFields ? { ...data } : null;
    this.addDataFunction = data && data.addDataFunction ? data.addDataFunction : null;
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addData(): void {
    if (this.addDataFunction) {
      this.addDataFunction(this.formData);
      this.closeDialog();
    }
  }
}
