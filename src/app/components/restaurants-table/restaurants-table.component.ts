import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RestaurantsTableDataSource } from './restaurants-table-datasource';
import { IChef, IDish, IRestaurant } from '../../interfaces/data.interface';
import { RestaurantsService } from '../../services/restaurant.service';
import { displayedColumns } from '../../constants/restaurantDisplayedColums';
import { DishService } from '../../services/dish.service';
import { ChefService } from '../../services/chef.service';

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

  constructor(private restaurantsService: RestaurantsService, private chefService: ChefService, private dishService: DishService) {
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

}
