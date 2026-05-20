import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaToggleOn, FaToggleOff, FaStar } from 'react-icons/fa'

const PROGRAM_TYPES = ['all', 'fellowship', 'pg-diploma', 'certificate']

const CoursesList = () => {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchCourses = async () => {
    setLoading(true)
    let query = supabase.from('courses').select('*').order('display_order').order('id')
    if (typeFilter !== 'all') query = query.eq('program_type', typeFilter)
    if (search) query = query.ilike('title', `%${search}%`)
    const { data } = await query
    setCourses(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchCourses() }, [search, typeFilter])

  const toggleActive = async (course: any) => {
    await supabase.from('courses').update({ is_active: !course.is_active }).eq('id', course.id)
    fetchCourses()
  }

  const toggleFeatured = async (course: any) => {
    await supabase.from('courses').update({ is_featured: !course.is_featured }).eq('id', course.id)
    fetchCourses()
  }

  const deleteCourse = async (id: number) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('courses').delete().eq('id', id)
    setDeleting(null)
    fetchCourses()
  }

  const typeLabel: Record<string, string> = {
    'fellowship': 'Fellowship',
    'pg-diploma': 'PG Diploma',
    'certificate': 'Certificate',
  }

  const typeColor: Record<string, string> = {
    'fellowship': 'bg-blue-100 text-blue-700',
    'pg-diploma': 'bg-purple-100 text-purple-700',
    'certificate': 'bg-green-100 text-green-700',
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-0.5">{courses.length} courses found</p>
        </div>
        <Link
          to="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-[#002D72] hover:bg-[#003a8c] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <FaPlus className="text-xs" /> Add Course
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {PROGRAM_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 text-sm rounded-lg font-medium capitalize transition-colors ${
                typeFilter === t ? 'bg-[#002D72] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-[#002D72]'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm mt-1">Try adjusting your filters or add a new course</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-600">Course</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Price</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Rating</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-center">Featured</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-center">Active</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {course.image_url ? (
                          <img src={course.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{course.title}</p>
                          <p className="text-xs text-gray-500">{course.category} · {course.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor[course.program_type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {typeLabel[course.program_type] ?? course.program_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 hidden lg:table-cell">{course.price}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-amber-500">
                        <FaStar className="text-xs" /> {course.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleFeatured(course)} title="Toggle featured">
                        {course.is_featured
                          ? <FaToggleOn className="text-xl text-amber-500 mx-auto" />
                          : <FaToggleOff className="text-xl text-gray-300 mx-auto" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleActive(course)} title="Toggle active">
                        {course.is_active
                          ? <FaToggleOn className="text-xl text-green-500 mx-auto" />
                          : <FaToggleOff className="text-xl text-gray-300 mx-auto" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/courses/${course.id}/edit`}
                          className="text-[#002D72] hover:bg-blue-50 p-1.5 rounded-md transition-colors"
                          title="Edit course"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          disabled={deleting === course.id}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors disabled:opacity-40"
                          title="Delete course"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesList
