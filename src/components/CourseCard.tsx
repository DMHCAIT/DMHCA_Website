import { FaClock, FaGraduationCap, FaUsers } from 'react-icons/fa'

interface CourseCardProps {
  title: string
  duration: string
  eligibility: string
  description: string
  type: 'pg' | 'fellowship'
  image?: string
}

const CourseCard: React.FC<CourseCardProps> = ({ title, duration, eligibility, description, type }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden group">
      {/* Course Image Placeholder */}
      <div className={`h-48 ${
        type === 'pg' ? 'bg-gradient-to-br from-wine-red to-royal-violet' : 'bg-gradient-to-br from-royal-violet to-coral-red'
      } flex items-center justify-center relative overflow-hidden`}>
        <FaGraduationCap className="text-white text-6xl opacity-20" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            type === 'pg' ? 'bg-coral-red' : 'bg-wine-red'
          }`}>
            {type === 'pg' ? 'PG Course' : 'Fellowship'}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-wine-red transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600 text-sm">
            <FaClock className="text-coral-red mr-2" />
            <span className="font-medium">Duration:</span>
            <span className="ml-1">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaUsers className="text-coral-red mr-2" />
            <span className="font-medium">Eligibility:</span>
            <span className="ml-1">{eligibility}</span>
          </div>
        </div>

        <button className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  )
}

export default CourseCard