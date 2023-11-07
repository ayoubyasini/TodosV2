import { useEffect, useState } from "react";
import {GrAddCircle} from "react-icons/gr";
import RadioComponent from "components/element/RadioComponent";
import { BsAlignStart } from "react-icons/bs";
import {MdDoneAll} from "react-icons/md";
import {AiOutlineFileSearch} from "react-icons/ai"
import {FiSettings} from "react-icons/fi"


function Todo({req}) {
  const [todos,setTodos] = useState();
  const [todoItem,setTodoItem] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data)
    };

    fetchData();

    const filtredData = ({req}) => {
      const dataTodos = todos?.data.todos;

      for(let key in dataTodos) {
        if (dataTodos.hasOwnProperty(key)) {
          dataTodos[key].map((item) => {
            if(item._id === req) {
              setTodoItem(item);
            }
          })
        }    
      }
    }
    filtredData({req})
  },[todos?.status])
  

  const addHandler = async () => {
    // const res = await fetch("/api/todos", {
    //   method: "POST",
    //   body: JSON.stringify({title, status, description}),
    //   headers: {"Content-Type" : "application/json"}
    // });

    // const data = await res.json();
    // if(data.status === "success") {
    //   setTitle("");
    //   setStatus("todo");
    //   setDescription("")
    //   toast.success("Todo added!");
    // }
    // console.log(data)
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
            defaultValue={`${todoItem.title || ''}`}
            // value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="textArea">description</label>
          <textarea type="text" id="textArea" className="description" defaultValue={`${todoItem.description || ''}`} onChange={(e) => setDescription(e.target.value)}></textarea>       
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
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Todo;

export const getServerSideProps = (async (context) => {
  const req = context.query.todo;
  return { props: {req} }
})