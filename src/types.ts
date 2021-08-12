export type IProfile = {
  id: number;
  phone: string;
  email: string;
  name: string;
  lastName: string;
  secondName: string;
  roles: [
    {
      role: string;
      name: string;
    },
  ];
  status: {
    code: number;
    name: string;
  };
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type IArticle = {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture: {
    id: number;
    name: string;
    url: string;
  };
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
};

export type ITag = {
  id: number;
  name: string;
  code: string;
};

export type IAuthor = {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar: { id: number; name: string; url: string };
  updatedAt: string;
  createdAt: string;
};

export type IArticleDetails = {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture: {
    id: number;
    name: string;
    url: string;
  };
  author: {
    id: number;
    fullName: string;
    avatar: {
      id: number;
      name: string;
      url: string;
    };
  };
  tags: ITag[];
  updatedAt: string;
  createdAt: string;
};
