import BlogPost from "../components/BlogPost";
import { IForm } from "../interface";

const ViewOnly = ({posts}:{posts: IForm[]}) => {
  return (
    <>
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
    </>
  )
}

export default ViewOnly
