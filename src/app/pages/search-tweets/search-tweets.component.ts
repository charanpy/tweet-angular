import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { ToastrService } from './../../services/toatr/toastr.service';
import { validateHashtag } from './../../utils/tweet-hashtag';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.scss'],
})
export class SearchTweetsComponent implements OnInit {
  @ViewChild('hashtag') hashtag: ElementRef | null = null;
  constructor(private toastr: ToastrService, private tweet: TweetService) {}

  ngOnInit(): void {}

  onSearch() {
    let hashtag: string = this.hashtag?.nativeElement.value;
    const validation = validateHashtag(hashtag);
    if (validation.error) {
      this.toastr.openSnackBar(validation.error, 'error');
      return;
    }
    validation.result &&
      this.tweet
        .searchTweetsByHashtags(validation.result)
        .then((res) => console.log(res));
  }
}
