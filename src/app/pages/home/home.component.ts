import { TweetModel } from './../../models/tweet.mode';
import { TweetService } from './../../services/tweet/tweet.service';
import { AuthService } from './../../services/auth/auth.service';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tweets: TweetModel[] | [];
  tweetSubscribe: any = '';

  constructor(private auth: AuthService, private tweetService: TweetService) {
    this.tweets = [];
  }

  ngOnInit(): void {
    this.auth.updateProfile();
    this.tweetSubscribe = this.tweetService
      .getRealtimeTweet()
      .onSnapshot((res) => {
        const data = res.docs.map((item) => item.data());
        console.log(data);
        this.tweets = data as TweetModel[];
      });
  }

  async onSignOut() {
    try {
      await this.auth.signOut();
    } catch (error) {}
  }

  getTweet() {}

  ngOnDestroy() {
    this.tweetSubscribe();
  }
}
