import { Tweet } from 'src/app/models/tweet.mode';
import { ToastrService } from 'src/app/services/toatr/toastr.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { imageConfig } from './../../utils/config-image';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// @ts-ignore
import { v4 as uuid } from 'uuid';
// @ts-ignore
import { readAndCompressImage } from 'browser-image-resizer';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private fireStorage: AngularFireStorage,
    private auth: AuthService,
    private tweet: TweetService,
    private toastr: ToastrService
  ) {}

  async uploadImage(file: File, path: string, userImage: string | null) {
    let rezizedImage = await readAndCompressImage(file, imageConfig);
    const id = uuid();

    const filePath = `${path}/${id}/${file.name}`;
    const fileRef = this.fireStorage.ref(filePath);

    const task = this.fireStorage.upload(filePath, rezizedImage);

    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       return fileRef.getDownloadURL().subscribe((photo) => {
    //         // if (path === 'profile') {
    //         //   this.auth.updateProfileDetails({ photo });
    //         // }
    //         // if (userImage) this.deleteImage(userImage);
    //         // return this.updateToFirestore(path, photo, userImage);
    //         return photo;
    //       });
    //     })
    //   )
    //   .subscribe((res) => console.log(fileRef.getDownloadURL().toPromise())

    return task
      .snapshotChanges()
      .toPromise()
      .then(() => {
        return fileRef.getDownloadURL().toPromise();
      });
  }
  getTweetFromService() {
    this.tweet.getTweet();
  }
  deleteImage(image: string): void {
    const imageRef = this.fireStorage.storage.refFromURL(image);
    imageRef
      .delete()
      .then(() => console.log('deleted'))
      .catch((e) => console.log(e));
  }
}
