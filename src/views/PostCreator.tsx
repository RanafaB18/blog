import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "../components/CustomToolbar";
import { DataContext } from "../context/DataContext";
import { IForm } from "../interface";
import { formats, modules } from "../data/constants";
import { Params, useLoaderData, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

export async function loader({ params }: { params: Params<string> }) {
  const posts: IForm[] =
    JSON.parse(localStorage.getItem("blogPosts") ?? "") || [];
  const editPost = posts.find((post) => post.id === params.id);
  return editPost === undefined ? null : editPost;
}

const animationVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: .5
    }
  },
  exit: {
    opacity: 0
  }
}

const PostCreator = () => {
  const post = useLoaderData() as IForm; // undefined means newly created post else its an edit
  const [warning, setWarning] = useState(false);

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [formData, setFormData] = useState<IForm>(
    post || {
      author: "",
      publishedAt: today,
      mainImage: "",
      title: "",
      body: "",
      id: uuid(),
      excerpt: "",
    }
  );
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);
  const warningRef = useRef<HTMLDivElement>(null)
  const data = useContext(DataContext);
  if (!data) return <></>;
  const { setPosts, setFetchData } = data;

  function addToPosts(event: FormEvent) {
    event.preventDefault();
    if (
      Object.values(formData).some((value) => {
        return !/\S/.test(value);
      }) || !/\S/.test(quillRef.current?.getEditor().getText() || "")
    ) {
      scrollTo({behavior: "smooth", top: 0})
      setWarning(true);
      setTimeout(() => {
        setWarning(false)
      }, 2000);

      return;
    }
    setPosts((prevState) => {
      let newPosts;
      if (post !== undefined) {
        newPosts = prevState.map((mappedPost) => {
          if (mappedPost.id === post.id) {
            return formData;
          }
          return mappedPost;
        });
        setFetchData((prevState) => !prevState);
      } else {
        newPosts = [...prevState, formData];
      }
      try {
        localStorage.setItem("blogPosts", JSON.stringify(newPosts));
      } catch (e) {
        console.log("Localstorage is full, please empty data");
      }
      return newPosts;
    });
    navigate("/");
  }

  function updateForm(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }
  function getFormFile(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target.files;
    if (!target || target.length === 0) return;
    const fileReader = new FileReader();

    fileReader.onload = function () {
      setFormData((prevState) => {
        return {
          ...prevState,
          [event.target.name]: fileReader.result,
        };
      });
    };
    fileReader.readAsDataURL(target[0]);
  }

  function editorChange(value: string) {
    setFormData((prevState) => {
      return {
        ...prevState,
        body: value,
      };
    });
  }

  return (
    <section className="relative p-4 md:px-16 xl:max-w-6xl xl:mx-auto">
      <form onSubmit={addToPosts} className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            onChange={updateForm}
            id="title"
            value={formData.title}
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt">Excerpt</label>
          <input
            required
            type="text"
            name="excerpt"
            onChange={updateForm}
            value={formData.excerpt}
            id="excerpt"
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            required
            type="text"
            name="author"
            value={formData.author}
            onChange={updateForm}
            id="author"
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mainImage">Main image</label>
          <input
            type="file"
            name="mainImage"
            accept="image/png, image/jpg, image/bmp, image/webp"
            onChange={getFormFile}
            id="mainImage"
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Body</label>
          <>
            <CustomToolbar />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={formData.body}
              onChange={editorChange}
              modules={modules}
              formats={formats}
            />
          </>
        </div>
        <button
          type="submit"
          className="px-4 py-1 self-end rounded w-fit bg-green-600 text-white"
        >
          Publish
        </button>
      </form>
      <AnimatePresence>

      {warning && (
        <motion.div ref={warningRef} variants={animationVariant} initial="hidden" animate="visible" exit={"exit"} className="absolute border border-red-400d rounded-lg bg-red-400 text-white py-2 px-3 max-w-xs mx-auto top-0 left-0 right-0 flex gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          <p>Please ensure all fields are filled</p>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
};

export default PostCreator;
