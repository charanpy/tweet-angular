import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'src/app/services/toatr/toastr.service';

import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { dialogOptions } from 'src/app/components/add-tweet/select-image/utils';
import { fileValidator } from 'src/app/utils/file-validator';
import { FileValidator } from './../../../models/file-validator.model';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss'],
})
export class SelectImageComponent implements OnInit, OnDestroy, OnChanges {
  @Input() Component: string = 'tweet';
  @Input() loading: boolean = false;

  selectedImage: File | null = null;
  reader: FileReader = new FileReader();
  readerSubscription: any = '';
  url: any = '';

  @Output() sendSelectedImage = new EventEmitter<File | void>();
  @Output() selectedProfileImage = new EventEmitter<File>();

  constructor(private toastr: ToastrService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.loading, 'im');
  }

  ngOnChanges(change: SimpleChanges) {
    const loading: SimpleChange = change.loading?.currentValue;
    if (loading) {
      this.selectedImage = null;
    }
  }
  selectImage(e: Event) {
    const fileInput = <HTMLInputElement>e.target;
    const file = (<HTMLInputElement>e.target).files;
    if (file) {
      const validatedFile: FileValidator = fileValidator(file);
      if (!validatedFile.message) {
        this.loadImage(validatedFile);
        fileInput.value = '';
        this.sendSelectedImage.emit(validatedFile.file);
        return;
      }
      this.toastr.openSnackBar(validatedFile?.message, 'error');
    }
  }

  loadImage(validatedFile: FileValidator) {
    this.reader.readAsDataURL(validatedFile.file!);
    this.readerSubscription = this.reader.addEventListener('load', (e) => {
      this.selectedImage = validatedFile.file!;
      if (e.target?.result) {
        this.url = e.target?.result;
      }
    });
  }

  sendProfileImage() {
    if (this.selectedImage) {
      this.selectedProfileImage.emit(this.selectedImage);
      this.selectedImage = null;
    }
  }

  resetImage() {
    this.selectedImage = null;
    this.sendSelectedImage.emit();
  }

  openDialog() {
    this.matDialog.open(DialogBoxComponent, dialogOptions(this.url));
  }

  ngOnDestroy() {
    if (this.readerSubscription) {
      this.reader.removeEventListener('load', this.readerSubscription);
    }
  }
}
