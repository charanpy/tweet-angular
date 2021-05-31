import { TweetService } from 'src/app/services/tweet/tweet.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentModel } from './../../models/comment.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [
    '../tweet-item/tweet-item.component.scss',
    './comments.component.scss',
  ],
})
export class CommentsComponent implements OnInit {
  @Input() comment: CommentModel | null = null;
  @Input() id: string = '';
  @Input() tweetId: string = '';
  user: UserModel | null = null;
  date: Date = new Date(this.comment?.createdAt);
  constructor(private auth: AuthService, private tweet: TweetService) {}

  ngOnInit(): void {
    if (this.comment) {
      this.auth.getUserById(this.comment?.id!).then((user) => {
        if (user.data()) {
          const userDetails = user.data() as UserModel;
          this.user = userDetails;
        }
      });
    }
  }

  getImage() {
    return this.user?.photo || 'assets/user.png';
  }

  deleteComment() {
    this.tweet.deleteComment(this.tweetId, this.comment?.commentId!);
  }
}
