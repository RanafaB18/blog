import React, { createContext, useState } from "react";
import { DataContextType, IForm } from "../interface";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, ] = useState(true);
  const [posts, setPosts] = useState<IForm[]>([])
  console.log("Posts", posts);

  return <DataContext.Provider value={{
    isLoading,
    posts,
    setPosts
  }}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
