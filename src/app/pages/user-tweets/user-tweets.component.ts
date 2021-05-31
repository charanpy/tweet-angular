import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { TweetModel } from './../../models/tweet.mode';
import { TweetService } from './../../services/tweet/tweet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss'],
})
export class UserTweetsComponent implements OnInit, OnDestroy {
  tweets: TweetModel[] | [] = [];
  loading: boolean = true;
  userSubscription: Subscription = new Subscription();

  constructor(private tweetService: TweetService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe((user) => {
      if (user?.id) {
        this.tweetService.getUserTweet(user.id).then((tweets) => {
          this.tweets = tweets;
          this.loading = false;
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
