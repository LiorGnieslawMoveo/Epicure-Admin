import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})

export class GenericModalComponent {
  formData: any;
  addDataFunction: (formData: any) => void;

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = data && data.formFields ? { ...data } : null;
    this.addDataFunction = data && data.addDataFunction ? data.addDataFunction : null;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addData(): void {
    if (this.addDataFunction) {
      this.addDataFunction(this.formData);
      this.closeDialog();
    }
  }
}
