import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantsService } from '../../services/restaurant.service';
import { IChef, IDish, IRestaurant } from '../../interfaces/data.interface';
import { DishService } from '../../services/dish.service';
import { ChefService } from '../../services/chef.service';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})

export class GenericModalComponent implements OnInit {
  formData: any;
  addDataFunction: (formData: any) => void;
  restaurants: IRestaurant[] = [];
  dishes: IDish[] = [];
  chefs: IChef[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantsService,
    private dishService: DishService,
    private chefService: ChefService,
  ) {
    this.formData = data && data.formFields ? { ...data } : null;
    this.addDataFunction = data && data.addDataFunction ? data.addDataFunction : null;
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
    this.chefService.getChefs().subscribe((chefs) => {
      this.chefs = chefs;
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
