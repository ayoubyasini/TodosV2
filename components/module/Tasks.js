import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import {RiMastodonLine} from "react-icons/ri";
import {FaRegEdit} from "react-icons/fa";
import Link from 'next/link';

function Tasks({data,back,next,fetchTodos}) {

  const chnageStatus = async(id,status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({id,status}),
      headers: {"Content-Type" : "application/json"},
    })
    const data = await res.json();
    if(data.status === "success") fetchTodos();
  }

  return (
    <div className='tasks'>
      {data?.map(i => (
          <div key={i._id} className='tasks__card'>
              <span className={i.status}></span>
              <div className="icons">
                <RiMastodonLine />
             
              </div>
              <h4>{i.title}</h4>
              <h6>{i.description}</h6>
              <div>
                {
                  back ? (<button className="button-back" onClick={() => chnageStatus(i._id, back)}><BiLeftArrow />Back</button>) : null
                }
                {
                  next ? (<button className="button-next" onClick={() => chnageStatus(i._id, next)}>Next<BiRightArrow /></button>) : null
                }
              </div>
          </div>
      ))}
    </div>
  )
}

export default Tasks