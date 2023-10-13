import { motion } from "framer-motion";
const variant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 3,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
export const Loading = () => {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="visible"
      className="absolute top-0 bottom-0 w-full leading-relaxed tracking-wider flex flex-col justify-center items-center text-5xl"
    >
      <motion.div variants={item} transition={{ delay: 0.5 }}>
        LET
      </motion.div>
      <motion.div variants={item} transition={{ delay: 1.5 }}>
        ME
      </motion.div>
      <motion.div variants={item} transition={{ delay: 2.5 }}>
        COOK
      </motion.div>
    </motion.div>
  );
};
