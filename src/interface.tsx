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
    excerpt: string,
    id?: string
  }
export interface DataContextType {
    isLoading: boolean,
    posts: IForm[],
    setPosts: Dispatch<SetStateAction<IForm[]>>
}
