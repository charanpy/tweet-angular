import { imageConfig } from './../../utils/config-image';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// @ts-ignore
import { v4 as uuid } from 'uuid';
// @ts-ignore
import { readAndCompressImage } from 'browser-image-resizer';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private fireStorage: AngularFireStorage) {}

  async uploadImage(file: File, path: string, userImage: string | null) {
    let rezizedImage = await readAndCompressImage(file, imageConfig);
    const id = uuid();

    const filePath = `${path}/${id}/${file.name}`;
    const fileRef = this.fireStorage.ref(filePath);

    const task = this.fireStorage.upload(filePath, rezizedImage);
    return task
      .snapshotChanges()
      .toPromise()
      .then(() => {
        return fileRef.getDownloadURL().toPromise();
      });
  }

  deleteImage(image: string): void {
    const imageRef = this.fireStorage.storage.refFromURL(image);
    imageRef
      .delete()
      .then(() => console.log('deleted'))
      .catch((e) => console.log(e));
  }
}
