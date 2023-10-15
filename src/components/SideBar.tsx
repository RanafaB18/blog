import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
const variant = {
  hidden: {
    opacity: 0,
    height: 0,
    display: "none",
  },
  visible: {
    opacity: 1,
    display: "flex",
    height: "100%",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

const SideBar = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col justify-evenly items-center absolute z-10 bg-white left-0 right-0 top-24 h-44"
    >
      <Link
        to="/"
        onClick={() => {
          setOpen(false);
        }}
        className=""
      >
        Home
      </Link>
      <Link
        to="/create-post"
        onClick={() => {
          setOpen(false);
        }}
        className="px-4 py-1 rounded w-fit h-fit bg-green-600 text-white"
      >
        Create Post
      </Link>
    </motion.div>
  );
};

export default SideBar;
