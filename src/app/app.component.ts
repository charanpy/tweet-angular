import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from './models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriber: Subject<boolean> = new Subject();
  title = 'tweet-dev';
  loading: boolean = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth
      .getUser()
      .pipe(takeUntil(this.subscriber))
      .subscribe((user) => {
        if (user?.uid) {
          this.auth
            ?.setUser(user?.uid)
            ?.pipe(takeUntil(this.subscriber))
            ?.subscribe((data) => {
              if (data.exists) {
                this.auth.setUserInfo(data.data() as UserModel);
                this.loading = false;
              }
            });
        }
      });
  }

  ngOnDestroy() {
    this.subscriber.next(true);
    this.subscriber.complete();
  }
}
