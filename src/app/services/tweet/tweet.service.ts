import { Injectable } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  tweet: Tweet | null = null;

  getTweet() {
    console.log(this.tweet, 'get');

    return of(this.tweet);
  }

  setTweet(tweet: Tweet) {
    console.log(tweet, 'service');

    this.tweet = tweet;
    console.log(this.tweet);
  }

  constructor(private firestore: AngularFirestore) {}

  addTweet(tweet: Tweet) {
    const id = this.firestore.createId();
    return this.firestore.collection('tweets').doc(id).set(tweet);
  }

  getAllTweets() {
    return this.firestore.collection('tweets').ref.orderBy('date', 'desc');
  }
  getUserTweet(userId: string) {
    return this.firestore
      .collection('tweets')
      .ref.where('id', '==', userId)
      .orderBy('date', 'desc')
      .get()
      .then((res) => {
        const data = res.docs.map((data) => data.data());
        return data;
      });
  }
  searchTweetsByHashtags(hashtag: string) {
    return this.firestore
      .collection('tweets')
      .ref.where('hashtags', 'array-contains', hashtag)
      .orderBy('date', 'desc')
      .get()
      .then((res) => {
        const data = res.docs.map((data) => data.data());
        return data;
      });
  }
}
