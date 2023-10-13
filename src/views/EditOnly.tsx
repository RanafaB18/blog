import EditPost from "../components/EditPost";
import { IForm } from "../interface";

const EditOnly = ({posts}:{posts: IForm[]}) => {
  return (
    <div className="md:grid md:grid-cols-4 grid-flow-row md:gap-4">
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
    </div>
  )
}

export default EditOnly
