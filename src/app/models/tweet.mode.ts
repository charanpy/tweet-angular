export interface TweetModel {
  id: string;
  title: string;
  tweet: string;
  hashtags?: string[] | [];
  date: any;
  photo?: string;
}
