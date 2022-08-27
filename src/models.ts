export interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  surname: string;
  phoneNumber: string;
  address: string;
  role: number;
  posts?: IPost[];
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
  id?: number;
  title: string;
  description: string;
  //image need to clarifu
  image: string;
  userId: number;
  //user need to clarifu
  user: IUser;
  postType: string;
  tags?: ITag[];
}

export interface ICreatePost {
  title: string;
  description: string;
  userId: number;
  tagIds: number[];
  image?: string;
}

export interface ITag {
  tagId: number;
  name: string;
}
