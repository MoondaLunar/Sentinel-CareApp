import React, { useState } from 'react'
import { setAuth } from '../api'

export default function Login({onLogin}){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  function submit(e){
    e.preventDefault()
    setAuth(user, pass)
    onLogin(true)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><label>Username: <input value={user} onChange={e=>setUser(e.target.value)} /></label></div>
        <div><label>Password: <input type="password" value={pass} onChange={e=>setPass(e.target.value)} /></label></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
