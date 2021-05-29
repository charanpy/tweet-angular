import { TweetModel } from './../../models/tweet.mode';
import { TweetService } from './../../services/tweet/tweet.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tweets: TweetModel[] | [] = [];
  loading: boolean = true;
  constructor(private auth: AuthService, private tweetService: TweetService) {}

  ngOnInit(): void {
    this.auth.updateProfile();
    this.tweetService
      .getAllTweets()
      .then((tweet) => (this.tweets = tweet as TweetModel[]))
      .finally(() => (this.loading = false));
  }

  async onSignOut() {
    try {
      await this.auth.signOut();
    } catch (error) {}
  }
}
