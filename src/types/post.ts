export interface Post {
  id: number;
  title: string;
  description: string;
  grade: string;
  region: string;
  author: string;
  images: string[];
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  author: string;
}