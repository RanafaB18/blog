import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { IForm } from "../interface";
import { motion } from "framer-motion";
import { Markup } from "interweave";
const SinglePost = () => {
  const { year, month, day, id } = useParams();
  const data = useContext(DataContext);
  const [content, setContent] = useState<IForm>();
  const posts = data?.posts;
  console.log({ year, month, day, id });
  useEffect(() => {
    setContent(posts?.find((post) => post.id === id));
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full flex justify-between uppercase text-xs px-4 py-2">
        <p>{content?.publishedAt}</p>
        <p>
          By <span className="text-[#f28f81]">{content?.author}</span>
        </p>
      </div>
      <div className="flex flex-col p-8">
        <h2 className="text-xl text-center font-semibold mb-8">
          {content?.title}
        </h2>
        <img src={content?.mainImage} alt="" loading="lazy" />
        <hr className="my-8" />
        <Markup content={content?.body} />
      </div>
    </motion.div>
  );
};

export default SinglePost;