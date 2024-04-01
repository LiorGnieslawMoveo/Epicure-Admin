import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DishesTableDataSource } from './dishes-table-datasource';
import { IDish } from '../../interfaces/data.interface';
import { DishService } from '../../services/dish.service';

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

  displayedColumns = ['id', 'title', 'description', 'price', 'deleted', 'iconMeaning', 'restaurant'];

  constructor(private dishService: DishService) {
    this.dataSource = new DishesTableDataSource(this.dishService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log(this.table.dataSource)
  }
}
