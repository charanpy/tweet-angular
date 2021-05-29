import { UserModel } from './../../models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TweetModel } from './../../models/tweet.mode';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss'],
})
export class TweetItemComponent implements OnInit {
  @Input() tweet: TweetModel | null = null;
  user: string = '';
  constructor(private auth: AuthService) {}

  getProfileImage() {
    return this.tweet?.photo || 'assets/user.png';
  }

  ngOnInit(): void {
    this.auth.getUserById(this.tweet?.id!).then((user) => {
      if (user.data()) {
        const { username } = user.data() as UserModel;
        this.user = username;
      }
    });
  }
}
