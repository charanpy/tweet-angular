import { UploadImageService } from './../../services/upload-image/upload-image.service';
import { Router } from '@angular/router';
import { ToastrService } from './../../services/toatr/toastr.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TweetModel } from './../../models/tweet.mode';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { dialogOptions } from 'src/app/components/add-tweet/select-image/utils';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss'],
})
export class TweetItemComponent implements OnInit, OnDestroy {
  @Input() tweet: TweetModel | null = null;
  @Input() id: string = '';
  @Output() deleteTweetAction = new EventEmitter<string>();

  user: UserModel | null = null;
  liked: boolean = false;
  likes: number = 0;
  loading: boolean = true;
  likeSubscription: any = '';
  url: string = '';

  constructor(
    private auth: AuthService,
    private matDialog: MatDialog,
    private tweetService: TweetService,
    private toastr: ToastrService,
    private router: Router,
    private uploadImage: UploadImageService
  ) {}

  getProfileImage() {
    return this.user?.photo || 'assets/user.png';
  }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url, 3333);

    this.likeSubscription = this.tweetService.getLikes(this.tweet?.tweetId!);
    this.likeSubscription.on('value', (res: any) => {
      const likes = res.val();
      if (likes) {
        console.log('like trigger');

        if (likes[this.id]) this.liked = true;
        else this.liked = false;
        this.likes = Object.keys(likes).length;
      } else if (this.liked) {
        console.log('dislike trigger');
        this.liked = false;
        this.likes = 0;
      }
      this.loading = false;
    });
    this.auth.getUserById(this.tweet?.id!).then((user) => {
      if (user.data()) {
        const userDetails = user.data() as UserModel;
        this.user = userDetails;
      }
    });
  }

  openDialog() {
    this.matDialog.open(DialogBoxComponent, dialogOptions(this.tweet?.photo));
  }

  deleteTweet(id: string) {
    console.log(id);

    this.tweetService.deleteTweet(id).then(() => {
      this.toastr.openSnackBar('Tweet deleted');
      if ((this.url = '/user-tweets')) {
        this.deleteTweetAction.emit(id);
      }
      if (this.tweet?.photo) {
        this.uploadImage.deleteImage(this.tweet?.photo);
      }
    });
  }

  likeDislikeTweet() {
    if (this.loading) return;
    const data = {
      [this.liked ? 'dislike' : 'like']: 1,
    };
    console.log(data);

    this.tweetService.likeTweet(this.tweet?.tweetId!, this.id, data);
  }

  navigateTo() {
    this.router.navigate(['tweet', this.tweet?.tweetId], {
      replaceUrl: true,
    });
  }
  ngOnDestroy() {
    this.likeSubscription.off();
  }
}
