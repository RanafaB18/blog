import BlogPost from "../components/BlogPost";
import { IForm } from "../interface";

const ViewOnly = ({posts}:{posts: IForm[]}) => {
  return (
    <div className="xl:max-w-6xl xl:mx-auto">
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
    </div>
  )
}

export default ViewOnly
