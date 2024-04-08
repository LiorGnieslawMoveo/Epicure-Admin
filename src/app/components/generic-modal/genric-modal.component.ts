import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genric-modal',
  templateUrl: './genric-modal.component.html',
  styleUrl: './genric-modal.component.scss'
})
export class GenricModalComponent {
  formData: any;

  constructor(
    public dialogRef: MatDialogRef<GenricModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = { ...data };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}