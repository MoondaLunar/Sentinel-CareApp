import React, {useState, useEffect} from 'react'
import { fetchWithAuth } from '../api'

export default function Clients(){
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({name:'', dateOfBirth:''})
  const [vitalsForm, setVitalsForm] = useState({clientId:0, heartRate:0, bloodPressure:''})
  const [clientVitals, setClientVitals] = useState({})

  function load(){ fetchWithAuth('/api/clients').then(r=>r.json()).then(setClients) }
  useEffect(load,[])

  function loadVitals(clientId){
    fetchWithAuth('/api/clients/'+clientId+'/vitals').then(r=>r.json()).then(vitals => {
      setClientVitals(prev => ({...prev, [clientId]: vitals}))
    })
  }

  function create(){
    fetchWithAuth('/api/clients', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)}).then(r=>r.json()).then(()=>{ setForm({name:'',dateOfBirth:''}); load() })
  }

  function remove(id){ fetchWithAuth('/api/clients/'+id, {method:'DELETE'}).then(()=>load()) }

  function edit(client){
    const name = prompt('Name', client.name)
    if (name==null) return
    const dob = prompt('Date of Birth', client.dateOfBirth)
    const reason = prompt('Reason for update')
    if (!reason) return
    fetchWithAuth('/api/clients/'+client.id+'?reason='+encodeURIComponent(reason), {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, dateOfBirth:dob})}).then(()=>load())
  }

  function addVital(){
    fetchWithAuth('/api/clients/'+vitalsForm.clientId+'/vitals', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({heartRate:vitalsForm.heartRate, bloodPressure:vitalsForm.bloodPressure})}).then(r=>r.json()).then(()=>{ setVitalsForm({clientId:0,heartRate:0,bloodPressure:''}); loadVitals(vitalsForm.clientId) })
  }

  return (
    <div>
      <h2>Clients</h2>
      <div>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Date of Birth" value={form.dateOfBirth} onChange={e=>setForm({...form, dateOfBirth:e.target.value})} />
        <button onClick={create}>Add Client</button>
      </div>
      <ul>
        {clients.map(c => (
          <li key={c.id}>
            {c.name} — DOB: {c.dateOfBirth}
            <button onClick={()=>edit(c)}>Edit</button>
            <button onClick={()=>remove(c.id)}>Delete</button>
            <button onClick={()=>loadVitals(c.id)}>Load Vitals</button>
            <br />
            <strong>Vitals:</strong>
            <ul>
              {(clientVitals[c.id] || []).map(v => <li key={v.id}>HR: {v.heartRate}, BP: {v.bloodPressure}, Time: {new Date(v.timestamp).toLocaleString()}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      <h3>Add Vital</h3>
      <div>
        <select value={vitalsForm.clientId} onChange={e=>setVitalsForm({...vitalsForm, clientId:parseInt(e.target.value,10)})}>
          <option value={0}>Select Client</option>
          {clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input placeholder="Heart Rate" type="number" value={vitalsForm.heartRate} onChange={e=>setVitalsForm({...vitalsForm, heartRate:parseInt(e.target.value||0,10)})} />
        <input placeholder="Blood Pressure" value={vitalsForm.bloodPressure} onChange={e=>setVitalsForm({...vitalsForm, bloodPressure:e.target.value})} />
        <button onClick={addVital}>Add Vital</button>
      </div>
    </div>
  )
}
