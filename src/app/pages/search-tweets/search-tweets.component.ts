import { TweetModel } from './../../models/tweet.mode';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { ToastrService } from './../../services/toatr/toastr.service';
import { validateHashtag } from './../../utils/tweet-hashtag';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.scss'],
})
export class SearchTweetsComponent implements OnInit {
  @ViewChild('hashtag') hashtag: ElementRef | null = null;
  tweets: TweetModel[] | [] = [];
  searched: boolean = false;
  loading: boolean = true;

  constructor(
    private toastr: ToastrService,
    private tweet: TweetService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.router?.firstChild) this.loading = false;
    this.router.firstChild?.params.subscribe((res) => {
      if (res?.hashtag) {
        this.search(res.hashtag);
        return;
      }
      this.loading = false;
    });
  }

  tweetMessage = () => this.searched && !this.tweets.length;

  onSearch() {
    if (!this.loading) this.loading = true;
    let hashtag: string = this.hashtag?.nativeElement.value;
    const validation = validateHashtag(hashtag);
    if (validation.error) {
      this.toastr.openSnackBar(validation.error, 'error');
      return;
    }
    this.search(validation.result!);
  }

  search(hashtag: string) {
    this.tweet.searchTweetsByHashtags(hashtag).then((res) => {
      this.searched = true;
      this.tweets = res as TweetModel[];
      this.loading = false;
    });
  }
}
