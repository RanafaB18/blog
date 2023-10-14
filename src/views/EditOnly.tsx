import EditPost from "../components/EditPost";
import { IForm } from "../interface";

const EditOnly = ({ posts }: { posts: IForm[] }) => {
  return (
    <div className="flex flex-col gap-4 xl:max-w-7xl xl:mx-auto xl:grid xl:grid-flow-row-dense xl:grid-cols-3">
      {posts.map((post) => {
        const { title, excerpt, id } = post;
        return <EditPost key={id} title={title} excerpt={excerpt} id={id} />;
      })}
    </div>
  );
};

export default EditOnly;
