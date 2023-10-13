import { motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import BlogPost from "../components/BlogPost";
import Lottie from "lottie-react";
import tumbleweed from "../../src/assets/tumbleweed.json"
const Home = () => {
  const data = useContext(DataContext);

  if (!data) return <></>;
  const { posts } = data;
  console.log("Posts", posts);
  if (posts.length === 0) {
    return <Lottie animationData={tumbleweed} className="absolute top-0 bottom-0 -z-10  px-5"/>
  }
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 pt-16 p-8"
      >
        {posts.map((post) => {
          const { author, mainImage, publishedAt, title, excerpt, id } = post;
          return (
            <BlogPost
              key={id}
              author={author}
              mainImage={mainImage}
              title={title}
              publishedAt={publishedAt}
              excerpt={excerpt}
              id={id}
            />
          );
        })}
      </motion.section>
    </>
  );
};

export default Home;
