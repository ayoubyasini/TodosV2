import Link from 'next/link';
import {useSession , signOut} from "next-auth/react"
import {VscListSelection} from "react-icons/vsc";
import {BiMessageSquareDetail} from "react-icons/bi";
import {MdSpaceDashboard} from "react-icons/Md";
import { FiLogOut } from 'react-icons/fi';


function Layout({children}) {
  const {status} = useSession();
  const logoutHandler = () => {
    signOut()
  }
  return (
    <div className="container">
        <header>
            <p>AyoubStart Todo App</p>
            {status === "authenticated" ? <button onClick={logoutHandler}><FiLogOut/>LOgout</button> : null}
        </header>
        <div className="container--main">
            <aside>
                <p>Welcome 👋</p>
                <ul>
                    <li>
                        <VscListSelection />
                        <Link href="/">Todos</Link>
                    </li>
                    <li>
                        <BiMessageSquareDetail />
                        <Link href="/add-todo">Add Todos</Link>
                    </li>
                    <li>
                        <MdSpaceDashboard />
                        <Link href="/profile">Profile</Link>
                    </li>
                </ul>
            </aside>
            <section>{children}</section>
        </div>
    </div>
  )
}

export default Layout