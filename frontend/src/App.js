import React, {useState} from 'react'
import Inventory from './components/Inventory'
import Clients from './components/Clients'
import AuditLog from './components/AuditLog'
import Login from './components/Login'
import { isLoggedIn, clearAuth } from './api'

export default function App(){
  const [view, setView] = useState('inventory')
  const [logged, setLogged] = useState(isLoggedIn())

  function logout(){ clearAuth(); setLogged(false) }

  if(!logged) return <Login onLogin={setLogged} />

  return (
    <div style={{padding:20}}>
      <h1>PPE Inventory App</h1>
      <div style={{float:'right'}}><button onClick={logout}>Logout</button></div>
      <nav>
        <button onClick={()=>setView('inventory')}>Inventory</button>
        <button onClick={()=>setView('clients')}>Clients</button>
        <button onClick={()=>setView('audit')}>Audit Log</button>
      </nav>
      <hr />
      {view==='inventory' && <Inventory />}
      {view==='clients' && <Clients />}
      {view==='audit' && <AuditLog />}
    </div>
  )
}
