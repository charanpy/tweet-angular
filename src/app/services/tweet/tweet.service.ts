import { Injectable } from '@angular/core';
import { TweetModel as Tweet } from 'src/app/models/tweet.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private firestore: AngularFirestore) {}

  addTweet(tweet: Tweet) {
    const id = this.firestore.createId();
    return this.firestore.collection('tweets').doc(id).set(tweet);
  }

  getAllTweets() {
    return this.firestore
      .collection('tweets')
      .ref.orderBy('date', 'desc')
      .get()
      .then((res) => {
        const data = res.docs.map((data) => data.data());
        return data;
      });
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
