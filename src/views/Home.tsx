import { motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import Lottie from "lottie-react";
import tumbleweed from "../../src/assets/tumbleweed.json";
import ViewOnly from "./ViewOnly";
import EditOnly from "./EditOnly";
const Home = () => {
  const data = useContext(DataContext);
  const [toggled, setToggled] = useState({ view: true, edit: false });
  if (!data) return <></>;
  const { mutablePosts } = data;

  if (mutablePosts.length === 0) {
    return (
      <Lottie
        animationData={tumbleweed}
        className="absolute inset-0 md:max-w-lg md:mx-auto -z-10 px-5"
      />
    );
  }
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 pt-0 p-8 md:px-16"
      >
        <div className="flex justify-center">
          <div
            onClick={() => setToggled({ view: true, edit: false })}
            className={`cursor-pointer px-12 py-3
            bg-gray-700 bg-opacity-5 rounded-tl-md
             rounded-bl-md ml-2 ${toggled.view && " text-white bg-opacity-50"}`}
          >
            <span>View</span>
          </div>
          <div
            onClick={() => setToggled({ view: false, edit: true })}
            className={`cursor-pointer px-12 py-3
            bg-gray-700 bg-opacity-5 rounded-tr-md
            rounded-br-md ${toggled.edit && "text-white bg-opacity-50"}`}
          >
            <span>Edit</span>
          </div>
        </div>
        {toggled.view && <ViewOnly posts={mutablePosts} />}
        {toggled.edit && <EditOnly posts={mutablePosts} />}
      </motion.section>
    </>
  );
};

export default Home;
