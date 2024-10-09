import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  hero?: Hero;
  readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);
  readonly data = inject<{hero: Hero}>(MAT_DIALOG_DATA);

  constructor() {
    this.hero = this.data.hero;
  }

  sendResponse(response: boolean) {
    this.dialogRef.close(response);
  }

}
