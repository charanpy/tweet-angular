import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TweetModel } from './../../models/tweet.mode';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.scss'],
})
export class TweetsListComponent implements OnInit, OnDestroy {
  @Input() tweets: TweetModel[] | [] = [];
  @Input() searched: boolean = true;
  id: string = '';
  userSubscription: Subscription = new Subscription();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription.add(
      this.auth.user.subscribe((user) => (this.id = user?.id))
    );
    this.userSubscription.add(
      this.auth.getUser().subscribe((userData) => {
        if (!userData) return;
        this.id = userData?.uid;
      })
    );
  }

  deleteTweet(id: string) {
    this.tweets = this.tweets.filter((tweet) => tweet.tweetId !== id);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
