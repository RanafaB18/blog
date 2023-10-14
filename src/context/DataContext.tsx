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
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    setMutablePosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFetchData(false);
  }, [search, posts.length, fetchData]);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        posts,
        search,
        mutablePosts,
        setFetchData,
        setMutablePosts,
        setPosts,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
