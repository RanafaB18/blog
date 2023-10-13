import React, { createContext, useState } from "react";
import { DataContextType, IForm } from "../interface";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading] = useState(true);
  const postsExist = localStorage.getItem("blogPosts");
  const localPosts = postsExist ? JSON.parse(postsExist) : [];
  const [posts, setPosts] = useState<IForm[]>(localPosts);
  const [search, setSearch] = useState("");

  return (
    <DataContext.Provider
      value={{
        isLoading,
        posts,
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
