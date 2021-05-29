import { TweetService } from 'src/app/services/tweet/tweet.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from './models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tweet-dev';
  loading: boolean = true;
  getUserSubscription: Subscription = new Subscription();

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getUserSubscription.add(
      this.auth.getUser().subscribe((user) => {
        if (user?.uid) {
          this.getUserSubscription.add(
            this.auth?.setUser(user?.uid)?.subscribe((data) => {
              if (data.exists) {
                this.auth.setUserInfo(data.data() as UserModel);
                this.loading = false;
              }
            })
          );
        } else {
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.getUserSubscription.unsubscribe();
  }
}
