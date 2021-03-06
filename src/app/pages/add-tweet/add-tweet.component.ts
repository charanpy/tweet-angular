import { Subscription } from 'rxjs';
import { UploadImageService } from './../../services/upload-image/upload-image.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from './../../services/toatr/toastr.service';
import { generateHashtag } from 'src/app/utils/tweet-hashtag';
import { TweetModel as Tweet } from 'src/app/models/tweet.mode';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.scss'],
  providers: [TweetService],
})
export class AddTweetComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  selectedImage: File | null = null;
  loading = false;
  userSubscription: Subscription = new Subscription();

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private tweet: TweetService,
    private storage: UploadImageService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe(
      (user) => (this.userId = user.id)
    );
  }

  OnPostTweet(f: NgForm) {
    if (f.invalid) {
      this.toastr.openSnackBar('Please fill out all fields', 'error');
      return;
    }
    this.loading = true;
    const { title, tweet } = f.value;
    const hashtags = generateHashtag(tweet);
    const newTweet: Tweet = {
      id: this.userId!,
      title,
      tweet: tweet.split('#')[0],
      hashtags,
      date: this.auth.getTimestamp(),
    };
    if (!this.selectedImage) {
      this.tweet
        .addTweet(newTweet)
        .then(() => this.showToastr())
        .finally(() => (this.loading = false));
      return;
    }
    this.addTweetWithImage(newTweet);
    f.resetForm();
  }

  setImage(file: File | void) {
    if (file) {
      this.selectedImage = file;
      return;
    }
    this.selectedImage = null;
  }

  addTweetWithImage(tweet: Tweet) {
    this.storage
      .uploadImage(this.selectedImage!, 'tweet', null)
      .then((photo) => {
        tweet.photo = photo;
        this.tweet.addTweet(tweet).then(() => this.showToastr());
      })
      .finally(() => (this.loading = false));
  }

  showToastr() {
    return this.toastr.openSnackBar('Tweet added successfully');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
