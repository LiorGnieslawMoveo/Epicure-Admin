import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-generic-modal',
    templateUrl: './generic-modal.component.html',
    styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {
    formData: any;

    constructor(
        public dialogRef: MatDialogRef<GenericModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.formData = { ...data };
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}