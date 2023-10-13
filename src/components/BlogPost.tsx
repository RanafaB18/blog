import { colors } from "../data/constants";
import { Link } from "react-router-dom";
import { IForm } from "../interface";

const BlogPost = ({
  mainImage,
  title,
  author,
  excerpt,
  publishedAt,
  id

}: IForm) => {
console.log("ID", id);

  const color = colors[Math.floor(Math.random() * colors.length)];

  const date = new Date(publishedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const slug = title.toLowerCase().split('').join('-')
  console.log(slug);

  return (
    <Link
      to={`/${year}/${month}/${day}/${id}`}
      className="flex flex-col pb-8"
    >
      <div className="w-full tracking-wider">
        <img
          src={mainImage}
          alt={title}
          loading="lazy"
          className="h-44 w-96 object-cover object-center"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-full flex justify-between uppercase text-xs text-white px-2 py-2"
        >
          <p>{formattedDate}</p>
          <p>By {author}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-center pt-5 px-3">
        <p className="text-xl">{title}</p>
        <p className="px-2">{excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogPost;
