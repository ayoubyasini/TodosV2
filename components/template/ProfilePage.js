import { useEffect, useState } from "react";
import ProfileForm from "components/module/ProfileForm";
import {CgProfile} from "react-icons/cg";
import ProfileData from "components/module/ProfileData";

function ProfilePage() {
    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [data, setData] = useState(null);

    const submitHandler = async () => {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({ name, lastName, password}),
        headers: {"Content-Type": "application/json"},
      });
      const data = await res.json();
      console.log(data)
    }
    useEffect(() => {
      fetchData();
    },[])

    const fetchData = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if(data.status === "success" && data.data.name && data.data.lastName) {
        setData(data.data)
      }
    }

  return (
    <div className="produle-form">
        <h2>
            <CgProfile />
            Profile
        </h2>
        {data ? (<ProfileData data={data} />) : (
          <ProfileForm 
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
          />
        )}
        
    </div>
  )
}

export default ProfilePage