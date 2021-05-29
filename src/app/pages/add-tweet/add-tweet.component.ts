import { dialogOptions } from './utils';
import { UploadImageService } from './../../services/upload-image/upload-image.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from './../../services/toatr/toastr.service';
import { generateHashtag } from 'src/app/utils/tweet-hashtag';
import { Tweet } from 'src/app/models/tweet.mode';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './../../components/dialog-box/dialog-box.component';
import { fileValidator } from 'src/app/utils/file-validator';
import { FileValidator } from 'src/app/models/file-validator.model';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.scss'],
  providers: [TweetService],
})
export class AddTweetComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  selectedImage: File | null = null;
  url: any = '';
  reader = new FileReader();
  readerSubscription: any = '';

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private tweet: TweetService,
    private matDialog: MatDialog,
    private storage: UploadImageService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getId();
    this.userId &&
      this.tweet.getUserTweet(this.userId).then((res) => console.log(res));
  }

  OnPostTweet(f: NgForm) {
    if (f.invalid) {
      this.toastr.openSnackBar('Please fill out all fields', 'error');
      return;
    }
    const { title, tweet } = f.value;
    const hashtags = generateHashtag(tweet);
    if (this.userId) {
      const newTweet: Tweet = {
        id: this.userId,
        title,
        tweet,
        hashtags,
        date: this.auth.getTimestamp(),
      };
      this.tweet.setTweet(newTweet);
      if (!this.selectedImage) {
        this.tweet
          .addTweet(tweet)
          .then(() => this.openSnackBar('Tweet added successfully', 'success'));
        return;
      }
      this.storage
        .uploadImage(this.selectedImage, 'tweet', null)
        .then((photo) => {
          newTweet.photo = photo;

          this.tweet
            .addTweet(newTweet)
            .then(() =>
              this.openSnackBar('Tweet added successfully', 'success')
            );
        });
    }
  }

  selectImage(e: Event) {
    const fileInput = <HTMLInputElement>e.target;
    const file = (<HTMLInputElement>e.target).files;
    if (file) {
      const validatedFile: FileValidator = fileValidator(file);
      if (validatedFile.file) {
        this.reader.readAsDataURL(validatedFile.file);
        this.readerSubscription = this.reader.addEventListener('load', (e) => {
          this.selectedImage = validatedFile.file!;
          if (e.target?.result) {
            this.url = e.target?.result;
          }
          fileInput.value = '';
        });
        return;
      }
      validatedFile.message &&
        this.toastr.openSnackBar(validatedFile?.message, 'error');
    }
  }

  setImage(file: File) {
    console.log(file);
    this.selectedImage = file;
  }

  resetImage() {
    this.selectedImage = null;
  }

  openDialog() {
    this.matDialog.open(DialogBoxComponent, dialogOptions(this.url));
  }

  openSnackBar(message: string, type: string = 'success') {
    this.toastr.openSnackBar(message, type);
  }
  ngOnDestroy() {
    if (this.readerSubscription) {
      this.reader.removeEventListener('load', this.readerSubscription);
    }
  }
}
