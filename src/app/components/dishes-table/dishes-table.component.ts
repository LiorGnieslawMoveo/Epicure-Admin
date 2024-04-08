import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DishesTableDataSource } from './dishes-table-datasource';
import { IDish, IRestaurant } from '../../interfaces/data.interface';
import { DishService } from '../../services/dish.service';
import { MatDialog } from '@angular/material/dialog';
import { displayedColumns, dishModalData } from '../../constants/dishData';
import { RestaurantsService } from '../../services/restaurant.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrl: './dishes-table.component.scss'
})
export class DishesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDish>;
  dataSource: DishesTableDataSource;
  dishes: IDish[] = [];
  restaurants: IRestaurant[] = [];
  displayedColumns = displayedColumns;
  modalData = dishModalData;

  constructor(private dishService: DishService, private restaurantsService: RestaurantsService, private dialog: MatDialog, private router: Router) {
    this.dataSource = new DishesTableDataSource(this.dishService);
  }

  ngOnInit(): void {
    this.getDishes();
    this.getRestaurants();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.fetchData().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  toggleEditMode(row: IDish): void {
    if (row.isEditing) {
      this.saveChanges(row);
    }
    row.isEditing = !row.isEditing;
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe(
      dishes => {
        this.dishes = dishes;
      },
      error => {
        console.error('Error fetching chefs:', error);
      }
    );
  }

  getRestaurants(): void {
    this.restaurantsService.getRestaurants().subscribe(
      restaurants => {
        this.restaurants = restaurants;
      },
      error => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  saveChanges(chefData: IDish): void {
    this.dishService.updateDish(chefData).subscribe(updatedDish => {
      const index = this.dataSource.data.findIndex(dish => dish?._id === updatedDish?._id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedDish;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  openDishModal(): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        ...this.modalData,
        addDataFunction: (dishData: IDish) => this.addNewDish(dishData)
      }
    });
  }

  addNewDish(dishData: any): void {
    const newDish: IDish = {
      title: dishData.formFields[0].value,
      description: dishData.formFields[1].value,
      price: dishData.formFields[2].value,
      iconMeaning: dishData.formFields[3].value,
      restaurant: dishData.formFields[4].value,
      deleted: false,
      isEditing: false
    }

    this.dishService.addNewDish(newDish).subscribe(newDish => {
      this.dataSource.fetchData().subscribe(data => {
        this.dataSource.data = data;
      });
    }, error => {
      console.error('Error adding new chef:', error);
    });
  }

  returnToAdminPage(): void {
    this.router.navigate(['../']);
  }
}
