import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaFilter, FaTicketAlt, FaTimes, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const Events = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [dbEvents, setDbEvents] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('events').select('*').eq('is_active', true).order('event_date', { ascending: false })
        if (data && data.length > 0) setDbEvents(data)
      } catch (_) {}
    })()
  }, [])

  // Handle body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
      
      // Add ESC key listener
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedEvent(null)
        }
      }
      window.addEventListener('keydown', handleEsc)
      
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedEvent])

  const hardcodedEvents = [
    {
      id: 1,
      title: 'Annual Medical Conference 2024',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'New Delhi Convention Center',
      description: 'Join leading medical professionals for the largest healthcare conference in India. Featuring keynote speeches, workshops, and networking sessions.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=350&fit=crop',
      category: 'conference',
      price: 'Free',
      seats: 500,
      registeredCount: 342,
      status: 'upcoming',
      featured: true,
      speakers: ['Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Dr. Amit Patel'],
      topics: ['Cardiology Updates', 'Digital Health', 'Medical Research', 'Patient Care']
    },
    {
      id: 2,
      title: 'Cardiology Workshop: Advanced ECG Interpretation',
      date: '2024-02-28',
      time: '02:00 PM',
      location: 'DMHCA Campus, Mumbai',
      description: 'Hands-on workshop focusing on advanced ECG interpretation techniques and cardiac emergency management.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=350&fit=crop',
      category: 'workshop',
      price: '₹2,500',
      seats: 50,
      registeredCount: 38,
      status: 'upcoming',
      featured: false,
      speakers: ['Dr. Sarah Wilson'],
      topics: ['ECG Analysis', 'Cardiac Arrhythmias', 'Emergency Cardiology']
    },
    {
      id: 3,
      title: 'Pediatric Medicine Symposium',
      date: '2024-04-10',
      time: '10:00 AM',
      location: 'Bangalore Medical Institute',
      description: 'Comprehensive symposium covering latest developments in pediatric healthcare and child development.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=350&fit=crop',
      category: 'symposium',
      price: '₹1,500',
      seats: 200,
      registeredCount: 145,
      status: 'upcoming',
      featured: true,
      speakers: ['Dr. Meera Agarwal', 'Dr. Vikram Singh'],
      topics: ['Child Development', 'Pediatric Surgery', 'Vaccination Updates']
    },
    {
      id: 4,
      title: 'Emergency Medicine Masterclass',
      date: '2024-02-20',
      time: '09:00 AM',
      location: 'Chennai Medical College',
      description: 'Intensive masterclass on emergency medicine protocols and life-saving procedures.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=350&fit=crop',
      category: 'masterclass',
      price: '₹3,500',
      seats: 75,
      registeredCount: 62,
      status: 'upcoming',
      featured: false,
      speakers: ['Dr. Ravi Krishnan'],
      topics: ['Trauma Care', 'Critical Care', 'Emergency Procedures']
    },
    {
      id: 5,
      title: 'Mental Health Awareness Webinar',
      date: '2024-01-15',
      time: '07:00 PM',
      location: 'Online Event',
      description: 'Interactive webinar discussing mental health challenges and treatment approaches in modern healthcare.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=350&fit=crop',
      category: 'webinar',
      price: 'Free',
      seats: 1000,
      registeredCount: 1000,
      status: 'past',
      featured: false,
      speakers: ['Dr. Anitha Rao'],
      topics: ['Mental Health', 'Psychology', 'Patient Counseling']
    },
    {
      id: 6,
      title: 'Surgical Techniques Innovation Forum',
      date: '2023-12-18',
      time: '11:00 AM',
      location: 'Hyderabad Medical Hub',
      description: 'Forum showcasing latest innovations in surgical techniques and minimally invasive procedures.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=350&fit=crop',
      category: 'forum',
      price: '₹4,000',
      seats: 150,
      registeredCount: 150,
      status: 'past',
      featured: true,
      speakers: ['Dr. Kiran Reddy', 'Dr. Sunita Nair'],
      topics: ['Minimally Invasive Surgery', 'Robotic Surgery', 'Surgical Innovation']
    }
  ]

  // Use Supabase data if available, otherwise use hardcoded
  const events = dbEvents.length > 0 ? dbEvents.map(e => ({
    ...e,
    date: e.event_date,
    time: e.event_time,
    featured: e.is_featured,
    registeredCount: 0,
    speakers: Array.isArray(e.speakers) ? e.speakers : [],
    topics: Array.isArray(e.topics) ? e.topics : []
  })) : hardcodedEvents

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter || event.status === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.topics.some((topic: string) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const upcomingEvents = events.filter(event => event.status === 'upcoming')
  const pastEvents = events.filter(event => event.status === 'past')

  return (
    <div>
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Medical <span className="text-jhu-gold">Events</span>
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200">
            Stay updated with the latest medical conferences, workshops, and educational events. 
            Connect with healthcare professionals and expand your knowledge.
          </p>
        </div>
      </section>

      {/* Main Content Section - All content in one section */}
      <section className="relative z-20 bg-white">
        
        {/* Search and Filter */}
        <div className="pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Search Bar */}
            <div className="relative flex-1 w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search events by title, description, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-red focus:border-transparent font-inter text-lg"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-4">
  <FaFilter className="text-gray-400" />
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-steel-blue focus:border-transparent bg-white text-black font-inter"
  >
    <option value="all" className="text-black">All Events</option>
    <option value="upcoming" className="text-black">Upcoming</option>
    <option value="past" className="text-black">Past Events</option>
    <option value="conference" className="text-black">Conferences</option>
    <option value="workshop" className="text-black">Workshops</option>
    <option value="symposium" className="text-black">Symposiums</option>
    <option value="webinar" className="text-black">Webinars</option>
    <option value="masterclass" className="text-black">Masterclasses</option>
  </select>
</div>
          </div>

          {/* Event Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="gradient-primary text-white rounded-2xl p-6 text-center">
              <FaCalendarAlt className="text-3xl mx-auto mb-3" />
              <div className="font-sora text-2xl font-bold">{upcomingEvents.length}</div>
              <div className="font-inter opacity-90">Upcoming Events</div>
            </div>
            <div className="gradient-primary text-white rounded-2xl p-6 text-center">
              <FaUsers className="text-3xl mx-auto mb-3" />
              <div className="font-sora text-2xl font-bold">{events.reduce((sum, event) => sum + event.registeredCount, 0)}</div>
              <div className="font-inter opacity-90">Total Registrations</div>
            </div>
            <div className="gradient-primary text-white rounded-2xl p-6 text-center">
              <FaTicketAlt className="text-3xl mx-auto mb-3" />
              <div className="font-sora text-2xl font-bold">{events.filter(event => event.price === 'Free').length}</div>
              <div className="font-inter opacity-90">Free Events</div>
            </div>
            <div className="gradient-primary text-white rounded-2xl p-6 text-center">
              <FaClock className="text-3xl mx-auto mb-3" />
              <div className="font-sora text-2xl font-bold">{pastEvents.length}</div>
              <div className="font-inter opacity-90">Completed Events</div>
            </div>
          </div>
        </div>
        </div>

        {/* Featured Events */}
        {events.filter(event => event.featured && event.status === 'upcoming').length > 0 && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-sora text-3xl font-bold text-gray-800 mb-12 text-center">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.filter(event => event.featured && event.status === 'upcoming').map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="h-48 relative overflow-hidden group/image">
                    {event.image ? (
                      <>
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-wine-red font-sora text-sm font-bold">FEATURED</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-wine-red to-royal-violet flex items-center justify-center">
                        <div className="text-white font-sora text-4xl font-bold">FEATURED</div>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="font-sora text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                    <p className="font-inter text-gray-600 mb-6">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center font-inter text-gray-600">
                        <FaCalendarAlt className="mr-2 text-slate-500" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center font-inter text-gray-600">
                        <FaClock className="mr-2 text-slate-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center font-inter text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-slate-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-wine-red font-inter">{event.price}</div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedEvent(event)}
                          className="border-2 border-wine-red text-wine-red px-6 py-3 rounded-xl font-inter font-semibold hover:bg-wine-red hover:text-white transition-all duration-300"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => navigate('/apply', { state: { fromEvent: event.id, eventTitle: event.title } })}
                          className="gradient-primary text-white px-6 py-3 rounded-xl font-inter font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* All Events */}
        <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-sora text-3xl font-bold text-gray-800 mb-2">
              {filter === 'all' ? 'All Events' : 
               filter === 'upcoming' ? 'Upcoming Events' : 
               filter === 'past' ? 'Past Events' : 
               filter.charAt(0).toUpperCase() + filter.slice(1) + 's'}
            </h2>
            <p className="font-inter text-gray-600">{filteredEvents.length} events found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="h-48 relative overflow-hidden group/image">
                  {event.image ? (
                    <>
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full bg-gradient-to-br from-wine-red to-royal-violet flex items-center justify-center">
                        <FaCalendarAlt className="text-white text-6xl opacity-20" />
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg z-10">
                    <div className="text-center">
                      <div className="font-inter text-wine-red font-bold text-lg">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="font-inter text-gray-600 text-xs uppercase font-semibold">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-wine-red rounded-full font-inter text-xs font-semibold">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-sora text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                  <p className="font-inter text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center font-inter text-gray-600">
                      <FaClock className="mr-2 text-slate-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center font-inter text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-slate-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center font-inter text-gray-600">
                      <FaUsers className="mr-2 text-slate-500" />
                      <span>{event.registeredCount}/{event.seats} registered</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-wine-red font-inter">{event.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedEvent(event)}
                        className="border-2 border-wine-red text-wine-red px-4 py-2 rounded-xl font-inter text-sm font-semibold hover:bg-wine-red hover:text-white transition-all duration-300"
                      >
                        View Details
                      </button>
                      {event.status === 'upcoming' && (
                        <button 
                          onClick={() => navigate('/apply', { state: { fromEvent: event.id, eventTitle: event.title } })}
                          className="gradient-primary text-white px-4 py-2 rounded-xl font-inter text-sm font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="font-inter text-xl text-gray-600 mb-4">No events found matching your criteria.</p>
              <button
                onClick={() => {
                  setFilter('all')
                  setSearchTerm('')
                }}
                className="px-6 py-3 gradient-primary text-white rounded-lg font-inter hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        </div>

        {/* Event Categories */}
        <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-sora text-4xl font-bold text-gray-800 mb-6">Event Categories</h2>
            <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
              Explore different types of medical events we organize throughout the year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="gradient-primary text-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <FaUsers className="text-3xl mx-auto mb-3" />
              <h3 className="font-sora text-xl font-bold mb-2">Conferences</h3>
              <p className="font-inter text-sm opacity-90">Large-scale medical conferences</p>
            </div>

            <div className="gradient-primary text-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <FaClock className="text-3xl mx-auto mb-3" />
              <h3 className="font-sora text-xl font-bold mb-2">Workshops</h3>
              <p className="font-inter text-sm opacity-90">Hands-on training sessions</p>
            </div>

            <div className="gradient-primary text-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <FaTicketAlt className="text-3xl mx-auto mb-3" />
              <h3 className="font-sora text-xl font-bold mb-2">Webinars</h3>
              <p className="font-inter text-sm opacity-90">Online educational sessions</p>
            </div>

            <div className="gradient-primary text-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <FaCalendarAlt className="text-3xl mx-auto mb-3" />
              <h3 className="font-sora text-xl font-bold mb-2">Symposiums</h3>
              <p className="font-inter text-sm opacity-90">Specialized medical topics</p>
            </div>
          </div>
        </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 text-white overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-sora text-4xl font-bold mb-6">Stay Updated with Our Events</h2>
          <p className="font-inter text-xl mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive notifications about upcoming medical events and conferences
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-wine-red px-8 py-4 rounded-xl font-inter font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Subscribe to Newsletter
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-bold text-lg hover:bg-white hover:text-wine-red hover:shadow-2xl hover:scale-105 transition-all duration-300">
              View Event Calendar
            </button>
          </div>
        </div>
        </div>
        
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedEvent(null)
            }
          }}
        >
          <div className="bg-white w-full max-w-3xl h-[95vh] rounded-xl shadow-2xl relative animate-slideUp flex flex-col overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors z-50"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Event Hero Image */}
            <div className="h-40 sm:h-48 md:h-56 w-full relative overflow-hidden flex-shrink-0">
              {selectedEvent.image ? (
                <>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-wine-red to-royal-violet" />
              )}
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-wine-red/90 rounded-md text-xs font-medium">
                    {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                  </span>
                  {selectedEvent.featured && (
                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-medium">
                      FEATURED
                    </span>
                  )}
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  {selectedEvent.title}
                </h1>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto">
              {/* Event Details */}
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Date</p>
                      <p className="text-base font-bold text-gray-900">{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-purple-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Time</p>
                      <p className="text-base font-bold text-gray-900">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-base font-bold text-gray-900">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTicketAlt className="text-red-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Price</p>
                      <p className="text-base font-bold text-gray-900">{selectedEvent.price}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Stats */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-600 text-lg" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Registered</p>
                        <p className="text-base font-bold text-gray-900">
                          {selectedEvent.registeredCount} / {selectedEvent.seats}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">Available</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedEvent.seats - selectedEvent.registeredCount}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${(selectedEvent.registeredCount / selectedEvent.seats) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About This Event</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Speakers */}
            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Speakers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedEvent.speakers.map((speaker: string, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-wine-red rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {speaker.charAt(0)}
                        </div>
                        <p className="text-base font-semibold text-gray-900">{speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topics */}
            {selectedEvent.topics && selectedEvent.topics.length > 0 && (
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.topics.map((topic: string, index: number) => (
                    <span key={index} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium text-gray-800">
                      <FaCheckCircle className="text-green-600 text-sm" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            </div>

            {/* Event Footer */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm">
                  <span className={`font-semibold ${selectedEvent.status === 'upcoming' ? 'text-green-600' : 'text-gray-500'}`}>
                    {selectedEvent.status === 'upcoming' ? '✓ Open' : 'Closed'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors px-3 py-1.5"
                  >
                    Close
                  </button>
                  {selectedEvent.status === 'upcoming' && (
                    <button
                      onClick={() => {
                        setSelectedEvent(null)
                        navigate('/apply', { state: { fromEvent: selectedEvent.id, eventTitle: selectedEvent.title } })
                      }}
                      className="bg-wine-red hover:bg-wine-red/90 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events