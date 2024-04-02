import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChefsTableDataSource } from './chefs-table-datasource';
import { IChef, IRestaurant } from '../../interfaces/data.interface';
import { ChefService } from '../../services/chef.service';
import { RestaurantsService } from '../../services/restaurant.service';
import { displayedColumns } from '../../constants/chefDisplayedColums';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../../shared/genric-modal/generic-modal.component';

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
  modalData: any = {
    title: 'Add New Chef',
    formFields: [
      { label: 'Name', type: 'text', placeholder: 'Enter chef name' },
      { label: 'Specialty', type: 'text', placeholder: 'Enter chef specialty' },
    ]
  };


  constructor(private chefService: ChefService, private dialog: MatDialog) {
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

  saveChanges(chefData: IChef): void {
    this.chefService.updateChef(chefData).subscribe(updatedChef => {
      const index = this.dataSource.data.findIndex(chef => chef?._id === updatedChef?._id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedChef;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  openChefModal(): void {
    console.log(this.modalData)
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: this.modalData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
