// types/index.ts

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  stats: {
    comments: number;
    retweets: number;
    likes: number;
  };
}