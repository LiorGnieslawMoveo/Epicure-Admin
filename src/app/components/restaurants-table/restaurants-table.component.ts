import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RestaurantsTableDataSource } from './restaurants-table-datasource';
import { IChef, IDish, IRestaurant } from '../../interfaces/data.interface';
import { RestaurantsService } from '../../services/restaurant.service';
import { displayedColumns, restaurantModalData } from '../../constants/restaurantData';
import { DishService } from '../../services/dish.service';
import { ChefService } from '../../services/chef.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrl: './restaurants-table.component.scss'
})

export class RestaurantsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IRestaurant>;
  dataSource: RestaurantsTableDataSource;
  displayedColumns = displayedColumns;
  modalData = restaurantModalData;

  constructor(private restaurantsService: RestaurantsService, private chefService: ChefService, private dishService: DishService, private dialog: MatDialog, private router: Router) {
    this.dataSource = new RestaurantsTableDataSource(this.restaurantsService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.fetchData().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  toggleEditMode(row: IRestaurant): void {
    if (row.isEditing) {
      this.saveChanges(row);
    }
    row.isEditing = !row.isEditing;
  }

  saveChanges(restaurantData: IRestaurant): void {
    this.restaurantsService.updateRestaurant(restaurantData).subscribe(updatedRestaurant => {
      const index = this.dataSource.data.findIndex(dish => dish?._id === updatedRestaurant?._id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedRestaurant;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }


  openRestaurantModal(): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        ...this.modalData,
        addDataFunction: (restaurantData: IDish) => this.addNewRestaurant(restaurantData)
      }
    });
  }

  addNewRestaurant(restaurantData: any): void {
    const newRestaurant: IRestaurant = {
      title: restaurantData.formFields[0].value,
      rating: restaurantData.formFields[1].value,
      dishes: restaurantData.formFields[2].value,
      chef: restaurantData.formFields[3].value,
      deleted: false,
      isEditing: false
    }

    this.restaurantsService.addNewRestaurant(newRestaurant).subscribe(newRestaurant => {
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
