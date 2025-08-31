import React from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api.js'

export default function CrewDetail() {
  const { id } = useParams()
  const [record, setRecord] = React.useState(null)
  const [exam, setExam] = React.useState({ vitals: { bp:'120/80', heartRate: 80, bmi: 22, temp: 36.8 }, findings:'', doctorNotes:'' })
  const [chronic, setChronic] = React.useState({ type:'diabetes', metrics:[{ label:'blood sugar', value: 110, unit:'mg/dL' }] })
  const [vacc, setVacc] = React.useState({ name:'Tdap', date: new Date().toISOString().slice(0,10), dosage:'0.5ml', batch:'B-001' })

  const load = async () => {
    const r = await api.get('/health/records/'+id)
    setRecord(r.data)
  }
  React.useEffect(()=>{ load() }, [id])

  const saveExam = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('vitals', JSON.stringify(exam.vitals))
    fd.append('findings', exam.findings)
    fd.append('doctorNotes', exam.doctorNotes)
    const r = await api.post('/health/exam/'+id, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    alert('Exam saved')
  }

  const saveChronic = async (e) => {
    e.preventDefault()
    const r = await api.post('/health/chronic/'+id, chronic)
    alert('Chronic log saved')
  }

  const saveVacc = async (e) => {
    e.preventDefault()
    const r = await api.post('/health/vaccination/'+id, vacc)
    alert('Vaccination saved')
  }

  return (
    <div>
      <h3>Crew Medical Record</h3>
      <div className="grid">
        <form className="card" onSubmit={saveExam}>
          <b>Initial / Periodic Examination</b>
          <input placeholder="BP" value={exam.vitals.bp} onChange={e=>setExam({...exam, vitals:{...exam.vitals, bp: e.target.value}})} />
          <input placeholder="Heart Rate" type="number" value={exam.vitals.heartRate} onChange={e=>setExam({...exam, vitals:{...exam.vitals, heartRate: Number(e.target.value)}})} />
          <input placeholder="BMI" type="number" value={exam.vitals.bmi} onChange={e=>setExam({...exam, vitals:{...exam.vitals, bmi: Number(e.target.value)}})} />
          <input placeholder="Temperature" type="number" value={exam.vitals.temp} onChange={e=>setExam({...exam, vitals:{...exam.vitals, temp: Number(e.target.value)}})} />
          <textarea placeholder="Findings" value={exam.findings} onChange={e=>setExam({...exam, findings: e.target.value})} />
          <textarea placeholder="Doctor notes" value={exam.doctorNotes} onChange={e=>setExam({...exam, doctorNotes: e.target.value})} />
          <button>Save Exam</button>
        </form>
        <form className="card" onSubmit={saveChronic}>
          <b>Chronic Illness Log</b>
          <select value={chronic.type} onChange={e=>setChronic({...chronic, type: e.target.value})}>
            <option value="diabetes">Diabetes</option>
            <option value="asthma">Asthma</option>
            <option value="hypertension">Hypertension</option>
            <option value="other">Other</option>
          </select>
          <input placeholder="Metric label" value={chronic.metrics[0].label} onChange={e=>setChronic({...chronic, metrics:[{...chronic.metrics[0], label:e.target.value}]})} />
          <input placeholder="Value" type="number" value={chronic.metrics[0].value} onChange={e=>setChronic({...chronic, metrics:[{...chronic.metrics[0], value:Number(e.target.value)}]})} />
          <input placeholder="Unit" value={chronic.metrics[0].unit} onChange={e=>setChronic({...chronic, metrics:[{...chronic.metrics[0], unit:e.target.value}]})} />
          <button>Save Chronic</button>
        </form>
        <form className="card" onSubmit={saveVacc}>
          <b>Vaccination</b>
          <input placeholder="Vaccine" value={vacc.name} onChange={e=>setVacc({...vacc, name:e.target.value})} />
          <input type="date" value={vacc.date} onChange={e=>setVacc({...vacc, date:e.target.value})} />
          <input placeholder="Dosage" value={vacc.dosage} onChange={e=>setVacc({...vacc, dosage:e.target.value})} />
          <input placeholder="Batch" value={vacc.batch} onChange={e=>setVacc({...vacc, batch:e.target.value})} />
          <button>Save Vaccination</button>
        </form>
      </div>
    </div>
  )
}
