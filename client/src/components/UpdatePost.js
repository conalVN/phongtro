import { CreatePost } from "../containers/System";

function UpdatePost({ setIsEdit }) {
  return (
    <section
      className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
    >
      <div
        className="w-1100 bg-white overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CreatePost isEdit />
      </div>
    </section>
  );
}

export default UpdatePost;
