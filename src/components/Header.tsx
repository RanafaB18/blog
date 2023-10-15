import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { blogName } from "../data/constants";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import SearchButton from "./SearchButton";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
const Header = () => {
  const data = useContext(DataContext);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
      if (searchRef.current) {
        searchRef.current.focus()
      }
    }, [searchOpen])
  if (!data) return <></>;
  const { setSearch, search } = data;

  function searchHandler() {
    setSearchOpen(!searchOpen);
  }

  return (
    <div className="relative pb-8 md:px-16 md:py-2 xl:max-w-6xl xl:mx-auto">
      <div className="flex items-center justify-between p-3 md:py-3 md:px-0">
        <Menu />
        <Link
          to="/create-post"
          className="px-4 py-1 rounded w-fit h-fit bg-green-600 text-white hidden md:flex"
        >
          Create Post
        </Link>
        <Link to={"/"} className="text-3xl whitespace-pre-line md:whitespace-normal text-center">
          {blogName}
        </Link>
        <SearchButton onSearch={searchHandler} />
      </div>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: "5px", opacity: 0 }}
            animate={{ height: "74px", opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ height: "5px", opacity: 0 }}
            className="absolute z-10 flex flex-col justify-center px-4 text-lg w-full md:w-10/12 xl:w-11/12 h-20 bg-white"
          >
            <input
              ref={searchRef}
              type="text"
              className="outline-none text-lg md:placeholder:text-center"
              placeholder="What are you looking for?"
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
