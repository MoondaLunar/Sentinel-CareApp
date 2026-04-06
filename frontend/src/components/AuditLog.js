import React, {useState, useEffect} from 'react'
import { fetchWithAuth } from '../api'

export default function AuditLog(){
  const [logs, setLogs] = useState([])
  useEffect(()=>{ fetchWithAuth('/api/audit').then(r=>r.json()).then(setLogs) },[])
  return (
    <div>
      <h2>Audit Log</h2>
      <table border="1"><thead><tr><th>User</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>Time</th><th>Details</th></tr></thead>
      <tbody>
        {logs.map(l => <tr key={l.id}><td>{l.username}</td><td>{l.action}</td><td>{l.entityName}</td><td>{l.entityId}</td><td>{new Date(l.timestamp).toLocaleString()}</td><td>{l.details}</td></tr>)}
      </tbody></table>
    </div>
  )
}
