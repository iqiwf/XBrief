import twitterText from "twitter-text";

export const LIMITS = {
  standard: 280,
  premium: 25000,
};

export function xCount(text) {
  return twitterText.parseTweet(String(text ?? "")).weightedLength;
}
