import { imageConfig } from './../../utils/config-image';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// @ts-ignore
import { readAndCompressImage } from 'browser-image-resizer';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(file: any) {
    let rezizedImage = await readAndCompressImage(file, imageConfig);

    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, rezizedImage);
    //  task.percentageChanges().subscribe((percentage) => {
    //    this.uploadPercent = percentage;
    //  });
    return task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((url) => {
            return url;
          })
        )
      )
      .subscribe((res) => res);
  }
}
