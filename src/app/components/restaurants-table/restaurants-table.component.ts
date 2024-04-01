import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RestaurantsTableDataSource } from './restaurants-table-datasource';
import { IRestaurant } from '../../interfaces/data.interface';
import { RestaurantsService } from '../../services/restaurant.service';
import { displayedColumns } from '../../constants/restaurantDisplayedColums';

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


  constructor(private restaurantsService: RestaurantsService) {
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
}
