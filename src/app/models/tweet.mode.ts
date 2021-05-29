export interface Tweet {
  id: String;
  title: String;
  tweet: String;
  hashtags: String[] | [];
  date: any;
  photo?: string;
}
