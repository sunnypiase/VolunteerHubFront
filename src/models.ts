export interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  surname: string;
  phoneNumber: string;
  address: string;
  profileImageId: number;
  profileImage: IImage;
  role: number;
  posts: IPost[];
}

export interface IUserLogIn {
  login: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
  address: string;
  role: string;
}
export interface IPost {
  postId: number;
  title: string;
  description: string;
  postImageId: number;
  postImage: IImage;
  userId: number;
  user: IUser;
  postType: string;
  tags: ITag[];
}
export interface ICreatePost {
  title: string;
  description: string;
  userId: number;
  tagIds: number[];
}
export interface IImage {
  imageId: number;
  format: string;
}

export interface ICreatePostConnection {
  title: string;
  message: string;
  volunteerPostId: number;
  needfulPostId: number;
}
export interface IPostConnection {
  postConnectionId: number;
  header: string;
  title: string;
  message: string;
  volunteerPost: IPost;
  needfulPost: IPost;
  userHasSeen: boolean;
}
export interface ITag {
  tagId: number;
  name: string;
}
