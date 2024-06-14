import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { imageSrc: string; message: string; message2: string }
  ) {}

  close(): void {
    this.dialogRef.close();
    this.navigateToEditEvent();
  }
  navigateToEditEvent(): void {
    this.router.navigate(['/home']);
  }
}
