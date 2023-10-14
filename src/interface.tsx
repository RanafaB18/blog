import { Dispatch, SetStateAction } from "react";

export interface IForm {
  title: string;
  author: string;
  mainImage: string;
  publishedAt: string;
  body?: string;
  excerpt: string;
  id?: string;
}

export interface IEdit {
  title: string;
  excerpt: string;
  id?: string;
}
export interface DataContextType {
  isLoading: boolean;
  posts: IForm[];
  search: string;
  mutablePosts: IForm[];
  setFetchData: Dispatch<SetStateAction<boolean>>;
  setMutablePosts: Dispatch<SetStateAction<IForm[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setPosts: Dispatch<SetStateAction<IForm[]>>;
}
