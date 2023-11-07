import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/Md";
import RadioComponent from "components/element/RadioComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");


  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({title, status, description}),
      headers: {"Content-Type" : "application/json"}
    });

    const data = await res.json();
    if(data.status === "success") {
      setTitle("");
      setStatus("todo");
      setDescription("")
      toast.success("Todo added!");
    }
    console.log(data)
  }

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="textArea">description</label>
          <textarea type="text" id="textArea" className="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>       
        </div>
        <div className="add-form__input--second">
          <RadioComponent status={status} setStatus={setStatus} value="todo" title="Todo">
            <BsAlignStart />
          </RadioComponent>
          <RadioComponent status={status} setStatus={setStatus} value="inProgress" title="In Progress">
            <FiSettings />
          </RadioComponent>
          <RadioComponent status={status} setStatus={setStatus} value="review" title="Review">
            <AiOutlineFileSearch />
          </RadioComponent>
          <RadioComponent status={status} setStatus={setStatus} value="done" title="Done">
            <MdDoneAll />
          </RadioComponent>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;