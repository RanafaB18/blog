import EditPost from "../components/EditPost";
import { IForm } from "../interface";

const EditOnly = ({posts}:{posts: IForm[]}) => {
  return (
    <>
      {posts.map((post) => {
          const { title, excerpt, id } = post;
          return (
            <EditPost
              key={id}
              title={title}
              excerpt={excerpt}
              id={id}
            />
          );
        })}
    </>
  )
}

export default EditOnly
