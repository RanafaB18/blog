import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SideBar from "./SideBar";

const top = {
  opened: {
    rotate: 140,
    translateY: 6,
  },
  closed: {
    rotate: 0,
  },
};

const middle = {
  opened: {
    height: 0,
  },
  closed: {
    height: "4px",
  },
};
const bottom = {
  opened: {
    rotate: -140,
    translateY: -6,
  },
  closed: {
    rotate: 0,
  },
};

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <motion.div
        onClick={handleClick}
        className="relative flex flex-col gap-1 cursor-pointer md:hidden"
      >
        <motion.div
          variants={top}
          initial="closed"
          animate={open ? "opened" : "closed"}
          transition={{ duration: 0.3 }}
          className="w-5 h-1 bg-black rounded-full"
        ></motion.div>
        <motion.div
          variants={middle}
          initial="closed"
          animate={open ? "opened" : "closed"}
          transition={{ duration: 0.3 }}
          className="w-5 h-1 bg-black rounded-full"
        ></motion.div>
        <motion.div
          variants={bottom}
          initial="closed"
          animate={open ? "opened" : "closed"}
          transition={{ duration: 0.3 }}
          className="w-5 h-1 bg-black rounded-full"
        ></motion.div>
      </motion.div>
      <AnimatePresence>
        {open && (
            <SideBar setOpen={setOpen}/>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
