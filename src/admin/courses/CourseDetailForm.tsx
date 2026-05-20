import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa'

const TABS = ['Overview', 'Highlights', 'Curriculum', 'Eligibility', 'Outcomes', 'Career Opps', 'Assessment', 'Fees']

const CourseDetailForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState(0)
  const [course, setCourse] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [instructor, setInstructor] = useState('DMHCA')
  const [overview, setOverview] = useState('')
  const [highlights, setHighlights] = useState<string[]>([''])
  const [curriculum, setCurriculum] = useState([{ module: 'Module 1', title: '', duration: '', topics: [''] }])
  const [eligibility, setEligibility] = useState<string[]>([''])
  const [outcomes, setOutcomes] = useState<string[]>([''])
  const [careerOpps, setCareerOpps] = useState<string[]>([''])
  const [assessment, setAssessment] = useState({ theory: '', practical: '', viva: '', description: '' })
  const [fees, setFees] = useState({ tuition: '', materials: '', examination: '', registration: '', total: '' })

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('courses').select('*').eq('id', id).single(),
      supabase.from('course_details').select('*').eq('course_id', id).single()
    ]).then(([{ data: c }, { data: d }]) => {
      if (c) setCourse(c)
      if (d) {
        setInstructor(d.instructor ?? 'DMHCA')
        setOverview(d.overview ?? '')
        setHighlights(d.key_highlights?.length ? d.key_highlights : [''])
        setCurriculum(d.curriculum?.length ? d.curriculum : [{ module: 'Module 1', title: '', duration: '', topics: [''] }])
        setEligibility(d.eligibility?.length ? d.eligibility : [''])
        setOutcomes(d.outcomes?.length ? d.outcomes : [''])
        setCareerOpps(d.career_opportunities?.length ? d.career_opportunities : [''])
        setAssessment(d.assessment ?? { theory: '', practical: '', viva: '', description: '' })
        setFees(d.fee_breakdown ?? { tuition: '', materials: '', examination: '', registration: '', total: '' })
      }
    })
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const payload = {
      course_id: Number(id),
      instructor,
      overview,
      key_highlights: highlights.filter(h => h.trim()),
      curriculum,
      eligibility: eligibility.filter(e => e.trim()),
      outcomes: outcomes.filter(o => o.trim()),
      career_opportunities: careerOpps.filter(c => c.trim()),
      assessment,
      fee_breakdown: fees,
      updated_at: new Date().toISOString()
    }
    const { error: err } = await supabase.from('course_details').upsert([payload], { onConflict: 'course_id' })
    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/courses')
  }

  // Helper: add/remove array items
  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter(p => [...p, ''])
  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, i: number) => setter(p => p.filter((_, idx) => idx !== i))
  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, i: number, v: string) => setter(p => p.map((item, idx) => idx === i ? v : item))

  const addModule = () => setCurriculum(p => [...p, { module: `Module ${p.length + 1}`, title: '', duration: '', topics: [''] }])
  const removeModule = (i: number) => setCurriculum(p => p.filter((_, idx) => idx !== i))
  const updateModule = (i: number, field: string, v: any) => setCurriculum(p => p.map((m, idx) => idx === i ? { ...m, [field]: v } : m))
  const addTopic = (mi: number) => setCurriculum(p => p.map((m, i) => i === mi ? { ...m, topics: [...m.topics, ''] } : m))
  const removeTopic = (mi: number, ti: number) => setCurriculum(p => p.map((m, i) => i === mi ? { ...m, topics: m.topics.filter((_: any, j: number) => j !== ti) } : m))
  const updateTopic = (mi: number, ti: number, v: string) => setCurriculum(p => p.map((m, i) => i === mi ? { ...m, topics: m.topics.map((t: string, j: number) => j === ti ? v : t) } : m))

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"
  const textareaCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none"

  if (!course) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/courses')} className="text-gray-500 hover:text-gray-700 p-1"><FaArrowLeft /></button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Course Details</h1>
          <p className="text-gray-500 text-sm">{course.title}</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap bg-white rounded-xl border border-gray-100 p-1.5 shadow-sm">
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${activeTab === i ? 'bg-[#002D72] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Overview Tab */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
              <input value={instructor} onChange={e => setInstructor(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Overview</label>
              <textarea rows={6} value={overview} onChange={e => setOverview(e.target.value)} placeholder="Detailed description of the course, its goals, and what students will gain..." className={textareaCls} />
            </div>
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 1 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">What students will learn (key takeaways)</p>
              <button onClick={() => addItem(setHighlights)} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add</button>
            </div>
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input value={h} onChange={e => updateItem(setHighlights, i, e.target.value)} placeholder={`Learning outcome ${i + 1}`} className={`${inputCls} flex-1`} />
                {highlights.length > 1 && <button onClick={() => removeItem(setHighlights, i)} className="text-red-400 hover:text-red-600 px-2"><FaTrash className="text-xs" /></button>}
              </div>
            ))}
          </div>
        )}

        {/* Curriculum Tab */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {curriculum.map((mod, mi) => (
              <div key={mi} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input value={mod.module} onChange={e => updateModule(mi, 'module', e.target.value)} placeholder="Module 1" className={inputCls} />
                    <input value={mod.title} onChange={e => updateModule(mi, 'title', e.target.value)} placeholder="Module Title" className={`${inputCls} sm:col-span-1`} />
                    <input value={mod.duration} onChange={e => updateModule(mi, 'duration', e.target.value)} placeholder="Duration (e.g. 5 lessons)" className={inputCls} />
                  </div>
                  {curriculum.length > 1 && (
                    <button onClick={() => removeModule(mi)} className="text-red-400 hover:text-red-600 mt-2"><FaTrash className="text-xs" /></button>
                  )}
                </div>
                <div className="pl-2 space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Topics:</p>
                  {mod.topics.map((topic: string, ti: number) => (
                    <div key={ti} className="flex gap-2">
                      <input value={topic} onChange={e => updateTopic(mi, ti, e.target.value)} placeholder={`Topic ${ti + 1}`} className={`${inputCls} flex-1`} />
                      {mod.topics.length > 1 && <button onClick={() => removeTopic(mi, ti)} className="text-red-400 hover:text-red-600 px-2"><FaTrash className="text-xs" /></button>}
                    </div>
                  ))}
                  <button onClick={() => addTopic(mi)} className="text-xs text-[#002D72] hover:underline flex items-center gap-1"><FaPlus className="text-xs" /> Add Topic</button>
                </div>
              </div>
            ))}
            <button onClick={addModule} className="flex items-center gap-2 text-sm text-[#002D72] hover:underline font-medium"><FaPlus className="text-xs" /> Add Module</button>
          </div>
        )}

        {/* Eligibility Tab */}
        {activeTab === 3 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Eligibility requirements / prerequisites</p>
              <button onClick={() => addItem(setEligibility)} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add</button>
            </div>
            {eligibility.map((e, i) => (
              <div key={i} className="flex gap-2">
                <input value={e} onChange={ev => updateItem(setEligibility, i, ev.target.value)} placeholder={`Requirement ${i + 1}`} className={`${inputCls} flex-1`} />
                {eligibility.length > 1 && <button onClick={() => removeItem(setEligibility, i)} className="text-red-400 hover:text-red-600 px-2"><FaTrash className="text-xs" /></button>}
              </div>
            ))}
          </div>
        )}

        {/* Outcomes Tab */}
        {activeTab === 4 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Course outcomes / what students will achieve</p>
              <button onClick={() => addItem(setOutcomes)} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add</button>
            </div>
            {outcomes.map((o, i) => (
              <div key={i} className="flex gap-2">
                <input value={o} onChange={e => updateItem(setOutcomes, i, e.target.value)} placeholder={`Outcome ${i + 1}`} className={`${inputCls} flex-1`} />
                {outcomes.length > 1 && <button onClick={() => removeItem(setOutcomes, i)} className="text-red-400 hover:text-red-600 px-2"><FaTrash className="text-xs" /></button>}
              </div>
            ))}
          </div>
        )}

        {/* Career Opps Tab */}
        {activeTab === 5 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Career opportunities after this course</p>
              <button onClick={() => addItem(setCareerOpps)} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add</button>
            </div>
            {careerOpps.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input value={c} onChange={e => updateItem(setCareerOpps, i, e.target.value)} placeholder={`Career opportunity ${i + 1}`} className={`${inputCls} flex-1`} />
                {careerOpps.length > 1 && <button onClick={() => removeItem(setCareerOpps, i)} className="text-red-400 hover:text-red-600 px-2"><FaTrash className="text-xs" /></button>}
              </div>
            ))}
          </div>
        )}

        {/* Assessment Tab */}
        {activeTab === 6 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theory Marks</label>
                <input value={assessment.theory} onChange={e => setAssessment(p => ({ ...p, theory: e.target.value }))} placeholder="e.g. 60%" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Practical Marks</label>
                <input value={assessment.practical} onChange={e => setAssessment(p => ({ ...p, practical: e.target.value }))} placeholder="e.g. 30%" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Viva Marks</label>
                <input value={assessment.viva} onChange={e => setAssessment(p => ({ ...p, viva: e.target.value }))} placeholder="e.g. 10%" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Description</label>
              <textarea rows={4} value={assessment.description} onChange={e => setAssessment(p => ({ ...p, description: e.target.value }))} className={textareaCls} />
            </div>
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 7 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['tuition', 'Tuition Fee'], ['materials', 'Materials'], ['examination', 'Examination'], ['registration', 'Registration']].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input value={(fees as any)[field]} onChange={e => setFees(p => ({ ...p, [field]: e.target.value }))} placeholder="₹0" className={inputCls} />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Fee</label>
              <input value={fees.total} onChange={e => setFees(p => ({ ...p, total: e.target.value }))} placeholder="₹1,10,000.00" className={inputCls} />
            </div>
          </div>
        )}
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        <button onClick={() => navigate('/admin/courses')} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#002D72] hover:bg-[#003a8c] rounded-lg disabled:opacity-60">
          <FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save Course Details'}
        </button>
      </div>
    </div>
  )
}

export default CourseDetailForm
