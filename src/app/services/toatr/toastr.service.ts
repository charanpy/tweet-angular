import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [type === 'error' ? 'error-msg' : 'success-msg'],
    });
  }
}
