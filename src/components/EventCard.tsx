import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  description: string
  image?: string
}

const EventCard: React.FC<EventCardProps> = ({ title, date, time, location, description, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden group">
      {/* Event Image */}
      <div className="h-48 relative overflow-hidden">
        {image ? (
          <>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-wine-red to-royal-violet flex items-center justify-center">
              <FaCalendar className="text-white text-6xl opacity-20" />
            </div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
          </>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="text-center">
            <div className="font-inter text-wine-red font-bold text-lg">
              {new Date(date).getDate()}
            </div>
            <div className="font-inter text-gray-600 text-xs uppercase font-semibold">
              {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="font-sora text-xl font-bold text-gray-800 mb-3 group-hover:text-wine-red transition-colors">
          {title}
        </h3>
        
        <p className="font-inter text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center font-inter text-gray-600 text-sm">
            <FaClock className="text-wine-red mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center font-inter text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-wine-red mr-2" />
            <span>{location}</span>
          </div>
        </div>

        <button className="w-full gradient-primary text-white py-3 rounded-xl font-inter font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
          Register Now
        </button>
      </div>
    </div>
  )
}

export default EventCard