import React, {useState, useEffect} from 'react'
import { fetchWithAuth } from '../api'

export default function Inventory(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({name:'', quantity:0, location:''})

  function load(){ fetchWithAuth('/api/ppe').then(r=>r.json()).then(setItems) }
  useEffect(load,[])

  function create(){
    fetchWithAuth('/api/ppe', {method:'POST', body: JSON.stringify(form)}).then(r=>r.json()).then(()=>{ setForm({name:'',quantity:0,location:''}); load() })
  }

  function remove(id){ fetchWithAuth('/api/ppe/'+id, {method:'DELETE'}).then(()=>load()) }

  function edit(item){
    const name = prompt('Name', item.name)
    if (name==null) return
    const qty = parseInt(prompt('Quantity', item.quantity),10)
    const loc = prompt('Location', item.location)
    fetchWithAuth('/api/ppe/'+item.id, {method:'PUT', body: JSON.stringify({name, quantity:qty, location:loc})}).then(()=>load())
  }

  return (
    <div>
      <h2>Inventory</h2>
      <div>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:parseInt(e.target.value||0,10)})} />
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <button onClick={create}>Add</button>
      </div>
      <table border="1"><thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Location</th><th>Actions</th></tr></thead>
      <tbody>
        {items.map(i=> <tr key={i.id}><td>{i.id}</td><td>{i.name}</td><td>{i.quantity}</td><td>{i.location}</td><td><button onClick={()=>edit(i)}>Edit</button> <button onClick={()=>remove(i.id)}>Delete</button></td></tr>)}
      </tbody></table>
    </div>
  )
}
