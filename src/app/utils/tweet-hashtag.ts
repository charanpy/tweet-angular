import { Validator } from './../models/input-validator.mode';
export const generateHashtag = (tweetBody: string): string[] | [] => {
  if (!tweetBody.includes('#')) {
    return [];
  }
  const hashtags = tweetBody.split('#').splice(1);
  return hashtags;
};

export const validateHashtag = (hashtag: string): Validator => {
  if (hashtag.length < 2) {
    return {
      error: 'Hashtag should be atleast 2 character long',
    };
  }
  hashtag = hashtag.toLowerCase();
  if (hashtag.includes('#')) {
    const removeHash = hashtag.split('#')[1];
    if (removeHash.includes(' ')) {
      const removeWhiteSpaces = removeHash.split(' ')[0];
      return {
        result: removeWhiteSpaces,
      };
    }

    return {
      result: removeHash,
    };
  }
  return {
    result: hashtag,
  };
};
