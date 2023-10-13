import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "../components/CustomToolbar";
import { DataContext } from "../context/DataContext";
import { IForm } from "../interface";
import { formats, modules } from "../data/constants";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid"
const PostCreator = () => {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  const [formData, setFormData] = useState<IForm>({
    author: "",
    publishedAt: today,
    mainImage: "",
    title: "",
    body: "",
    id: ""
  });
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  const data = useContext(DataContext);
  if (!data) return <></>;
  const { setPosts, posts } = data;

  function addToPosts(event: FormEvent) {
    event.preventDefault();
    const id = uuid()
    setPosts([...posts, {...formData, id }]);
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
    console.log("Editor", value);
    setValue(value);
    setFormData((prevState) => {
      return {
        ...prevState,
        body: value,
      };
    });
  }
  console.log(formData);

  return (
    <section className="p-4">
      <form onSubmit={addToPosts} className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={updateForm}
            id="title"
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt">Excerpt</label>
          <input
            type="text"
            name="excerpt"
            onChange={updateForm}
            id="excerpt"
            className="p-2 px-4 border border-[#dcdfe3] outline-blue-600 outline-offset-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
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
              value={value}
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
    </section>
  );
};

export default PostCreator;
