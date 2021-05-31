import { CommentModel } from './../../models/comment.model';
import { AuthService } from './../../services/auth/auth.service';
import { ToastrService } from 'src/app/services/toatr/toastr.service';
import { Subscription } from 'rxjs';
import { TweetModel } from './../../models/tweet.mode';
import { TweetService } from './../../services/tweet/tweet.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit, OnDestroy {
  @ViewChild('comment') comment: ElementRef | null = null;
  tweets: TweetModel[] | [] = [];
  loading: boolean = true;
  tweetSubscription: Subscription = new Subscription();
  userId: string = '';
  comments: CommentModel[] | [] = [];
  commentSub: any = '';
  tweetId: string = '';

  constructor(
    private router: ActivatedRoute,
    private tweetService: TweetService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.tweetSubscription.add(
      this.auth.user.subscribe((user) => {
        this.userId = user.id;
      })
    );
    this.router.params.subscribe((res) => {
      const tweetId = res?.id;
      if (!tweetId) {
        this.loading = false;
        return;
      }
      this.tweetId = tweetId;
      this.tweetSubscription.add(
        this.tweetService.getTweetById(tweetId).subscribe((response) => {
          const tweet = response.data();
          if (tweet) {
            console.log(tweet);

            this.tweets = [...this.tweets, tweet];
            this.getComment();
            // return;
          }
          this.loading = false;
        })
      );
    });
  }

  addComment() {
    const comment = this.comment?.nativeElement.value;
    if (!comment) {
      return this.toastr.openSnackBar('Comment is required', 'error');
    }
    const newComment: CommentModel = {
      id: this.userId,
      comment,
      commentId: this.tweetService.getDocId(),
      createdAt: this.auth.getdbTimestamp(),
    };

    if (!this.tweets.length) return;
    this.tweetService
      .addComment(this.tweets[0]?.tweetId!, newComment)
      .then(() => {
        if (this.comment) {
          this.comment.nativeElement.value = '';
        }
      });
  }

  getComment() {
    this.commentSub = this.tweetService
      .getComment(this.tweets[0].tweetId!)
      .on('value', (res) => {
        if (res.val()) {
          this.comments = Object.values(res.val());
        } else {
          this.comments = [];
        }
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.tweetSubscription.unsubscribe();
    this.commentSub.off('value');
  }
}
