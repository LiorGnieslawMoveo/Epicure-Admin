import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChefsTableDataSource } from './chefs-table-datasource';
import { IChef } from '../../interfaces/data.interface';
import { ChefService } from '../../services/chef.service';
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

  constructor(private chefService: ChefService) {
    this.dataSource = new ChefsTableDataSource(this.chefService);
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
    row.isEditing = !row.isEditing;
  }
}
