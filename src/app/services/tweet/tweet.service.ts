import { LikeDislike } from './../../models/like-dislike.model';
import { Injectable } from '@angular/core';
import { TweetModel as Tweet, TweetModel } from 'src/app/models/tweet.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommentModel } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  addTweet(tweet: Tweet) {
    const id = this.firestore.createId();
    tweet.tweetId = id;
    return this.firestore.collection('tweets').doc(id).set(tweet);
  }

  getRealtimeTweet() {
    return this.firestore.collection('tweets').ref.orderBy('date', 'desc');
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
      .collection<TweetModel>('tweets')
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

  deleteTweet(id: string) {
    return this.firestore.collection('tweets').doc(id).delete();
  }

  likeTweet(tweetId: string, userId: string, data: LikeDislike) {
    this.db.object(`likes/${tweetId}/${userId}`).set(data);
  }

  getLikes(tweetId: string) {
    return this.db
      .object(`likes/${tweetId}`)
      .query.orderByChild('like')
      .equalTo(1);
  }

  getDocId() {
    return this.firestore.createId();
  }

  getTweetById(tweetId: string) {
    return this.firestore.collection<TweetModel>('tweets').doc(tweetId).get();
  }

  addComment(postId: string, data: CommentModel) {
    return this.db.list(`comments/${postId}`).set(data.commentId, data);
  }

  deleteComment(postId: string, commentId: string) {
    console.log(postId, commentId);

    return this.db.list(`comments/${postId}/${commentId}`).remove();
  }

  getComment(postId: string) {
    return this.db.list(`comments/${postId}`).query;
  }
}
