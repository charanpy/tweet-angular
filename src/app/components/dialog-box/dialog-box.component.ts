import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public image: any,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {
    console.log(image);
  }

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.close();
  }
}
