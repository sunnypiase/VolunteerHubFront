export interface IUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  posts: IPost[];
}

export interface IUserLogIn {
  id?: number;
  login: string;
  password: string;
}

export interface IPost {
  id?: number;
  title: string;
  description: string;
  //image need to clarifu
  image: string;
  userId: number;
  //user need to clarifu
  //user: IUser;
  postType: string;
  tags: ITag[];
}

export interface ITag {
  id?: number;
  name: string;
}
