export interface IBlog {
  caption: string;
  video_url: string
  id: number;
  access_modifier: string;
  allow_comment: boolean;
  userId: number;
  likes: [{userId: number, blogId: number}];
  comments: IComment[] | [];
  user: {
    id: string;
    username: string;
    full_name: string;
    email: string;
    avatar: string;
  } | undefined
}

export interface IUser {
  id: number;
  accessToken: string;
  username: string;
  full_name: string;
  avatar: string;
  blogs: [IBlog];
  follows: [{id: number, followerId: number, followingId: number}]  
}

export interface IComment {
  id: number;
  content: string;
  display: boolean;
  userId: number;
  blogId: number;
  user: IUser;
}

