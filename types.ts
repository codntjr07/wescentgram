export interface Character {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  avatarUrl: string;
  posts: Post[];
  story: boolean;
  traits: string[];
  geminiSystemInstruction: string;
  followerCount: number;
  followingCount: number;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: number;
}