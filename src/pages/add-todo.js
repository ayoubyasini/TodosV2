import AddTodoPage from "../../components/template/AddTodoPage";
import {getSession} from "next-auth/react";
 
function addTodo() {
  return <AddTodoPage/>
}

export default addTodo;

export async function getServerSideProps({req}) {
  const session = await getSession({req});

  if(!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }


  return {props: {}}
}