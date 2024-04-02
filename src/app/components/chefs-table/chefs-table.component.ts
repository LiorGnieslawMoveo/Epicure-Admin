import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChefsTableDataSource } from './chefs-table-datasource';
import { IChef, IRestaurant } from '../../interfaces/data.interface';
import { ChefService } from '../../services/chef.service';
import { RestaurantsService } from '../../services/restaurant.service';
import { displayedColumns } from '../../constants/chefDisplayedColums';

@Component({
  selector: 'app-chefs-table',
  templateUrl: './chefs-table.component.html',
  styleUrls: ['./chefs-table.component.scss']
})
export class ChefsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IChef>;
  dataSource: ChefsTableDataSource;
  displayedColumns = displayedColumns;
  chefs: IChef[] = [];
  restaurants: IRestaurant[] = [];

  constructor(private chefService: ChefService, private restaurantsService: RestaurantsService) {
    this.dataSource = new ChefsTableDataSource(this.chefService);
  }

  ngOnInit(): void {
    this.getChefs();
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

  toggleEditMode(row: IChef): void {
    if (row.isEditing) {
      if (row.chefOfTheWeek) {
        const existingChefOfTheWeek = this.dataSource.data.find(chef => chef._id !== row._id && chef.chefOfTheWeek);
        if (existingChefOfTheWeek) {
          alert('Cannot set chefOfTheWeek to true for multiple rows.');
          row.chefOfTheWeek = false;
          return;
        }
      }
      this.saveChanges(row);
    }
    row.isEditing = !row.isEditing;
  }

  getChefs(): void {
    this.chefService.getChefs().subscribe(
      chefs => {
        this.chefs = chefs;
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

  saveChanges(chefData: IChef): void {
    this.chefService.updateChef(chefData).subscribe(updatedChef => {
      const index = this.dataSource.data.findIndex(chef => chef?._id === updatedChef?._id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedChef;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }
}
