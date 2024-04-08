import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChefsTableDataSource } from './chefs-table-datasource';
import { IChef } from '../../interfaces/data.interface';
import { ChefService } from '../../services/chef.service';
import { displayedColumns, chefModalData } from '../../constants/chefData';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { Router } from '@angular/router';

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
  modalData = chefModalData;

  constructor(private chefService: ChefService, private dialog: MatDialog, private router: Router) {
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
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        ...this.modalData,
        addDataFunction: (chefData: IChef) => this.addNewChef(chefData)
      }
    });
  }

  addNewChef(chefData: any): void {
    const newChef: IChef = {
      name: chefData.formFields[0].value,
      description: chefData.formFields[1].value,
      deleted: false,
      isEditing: false
    }

    this.chefService.addNewChef(newChef).subscribe(newChef => {
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

