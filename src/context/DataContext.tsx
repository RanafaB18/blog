import React, { createContext, useEffect, useState } from "react";
import { DataContextType, IForm } from "../interface";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading] = useState(true);
  const postsExist = localStorage.getItem("blogPosts");
  const localPosts = postsExist ? JSON.parse(postsExist) : [];
  const [posts, setPosts] = useState<IForm[]>(localPosts);
  const [mutablePosts, setMutablePosts] = useState<IForm[]>(posts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMutablePosts(
      posts.filter((post) => {
        if (post.title.toLowerCase().includes(search.toLowerCase())) {
          return post;
        }
      })
    );
  }, [search]);
  return (
    <DataContext.Provider
      value={{
        isLoading,
        posts,
        mutablePosts,
        search,
        setPosts,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
