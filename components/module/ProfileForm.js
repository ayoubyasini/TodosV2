import React from 'react'

function ProfileForm({
    name,
    lastName,
    password,
    setName,
    setLastName,
    setPassword,
    submitHandler
}) {
  return (
    <>
        <div className='profile-form__input'>
            <div>
                <label htmlFor='name'>Name:</label>
                <input type='text' id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='last-name'>Last Name:</label>
                <input type='text' id='last-name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>password:</label>
                <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={submitHandler}>Submit</button>
        </div>
    </>
  )
}

export default ProfileForm