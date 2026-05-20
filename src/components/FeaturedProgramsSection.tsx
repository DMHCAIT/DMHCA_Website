import { 
  FaArrowRight,
  FaClock,
  FaStar,
  FaGraduationCap,
  FaAward,
  FaPlay
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const titleToSlug = (t: string): string =>
  t.toLowerCase().replace(/[\u2018\u2019\u0027]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

const FeaturedProgramsSection = () => {
  const [dbPrograms, setDbPrograms] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('courses').select('*').eq('is_featured', true).eq('is_active', true).order('display_order').limit(4)
        if (data && data.length > 0) setDbPrograms(data)
      } catch (_) {}
    })()
  }, [])

  const hardcodedPrograms = [
    {
      id: 1,
      title: "Fellowship In Abdominal Imaging",
      lessons: 28,
      duration: "25 Week",
      level: "Expert",
      rating: 5.0,
      reviews: 1,
      institution: "DMHCA",
      price: "₹1,10,000.00",
      description: "Advanced abdominal imaging techniques and diagnosis",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=800&fit=crop"
    },
    {
      id: 2,
      title: "Fellowship In Breast Imaging",
      lessons: 23,
      duration: "25 Week",
      level: "Expert",
      rating: 5.0,
      reviews: 1,
      institution: "DMHCA", 
      price: "₹90,000.00",
      description: "Comprehensive breast imaging and mammography",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=800&fit=crop"
    },
    {
      id: 3,
      title: "Fellowship In Obstetrics Ultrasound",
      lessons: 24,
      duration: "25 Week",
      level: "Expert",
      rating: 5.0,
      reviews: 1,
      institution: "DMHCA",
      price: "₹1,40,000.00",
      description: "Obstetric ultrasound and fetal medicine",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=800&fit=crop"
    },
    {
      id: 5,
      title: "Fellowship In Reproductive Endocrinology",
      lessons: 27,
      duration: "50 Week",
      level: "Expert",
      rating: 5.0,
      reviews: 2,
      institution: "DMHCA",
      price: "₹1,30,000.00",
      description: "Reproductive endocrinology and fertility training",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop"
    }
  ]

  const programs = dbPrograms.length > 0 ? dbPrograms.map(p => ({
    ...p,
    institution: 'DMHCA',
    description: p.description ?? ''
  })) : hardcodedPrograms

  return (
    <section id="featured-programs" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-jhu-spirit-blue/10 text-jhu-blue px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border border-jhu-spirit-blue/20">Our Programs</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-jhu-dark mb-4 sm:mb-6">
            Featured Programs
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-jhu-gray max-w-3xl mx-auto px-4">
            Explore our most sought-after medical programs designed to advance your career in specialized healthcare fields.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {programs.map((program) => (
            <Link key={program.id} to={`/courses/${titleToSlug(program.title)}`} className="block bg-white rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group cursor-pointer border-t-4 border-jhu-spirit-blue">
              {/* Course Image */}
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-xs sm:text-sm p-3 sm:p-4 font-medium">{program.description}</p>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-3 sm:p-4">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-800">{program.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-sm ${i < Math.floor(program.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">({program.reviews})</span>
                </div>

                {/* Course Title */}
                <h3 className="text-base font-bold text-jhu-dark mb-3 line-clamp-2 group-hover:text-jhu-spirit-blue transition-colors font-sora">
                  {program.title}
                </h3>

                {/* Course Details */}
                <div className="flex items-center gap-3 text-xs text-jhu-gray mb-3">
                  <div className="flex items-center gap-1">
                    <FaGraduationCap className="text-jhu-spirit-blue" />
                    <span>{program.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-jhu-spirit-blue" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-jhu-gray mb-3">
                  <div className="flex items-center gap-1">
                    <FaAward className="text-jhu-spirit-blue" />
                    <span>{program.level}</span>
                  </div>
                </div>

                {/* Institution */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-jhu-gold rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-jhu-dark font-bold text-xs font-sora">D</span>
                    </div>
                    <span className="font-semibold text-jhu-gray text-sm">{program.institution}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-xl font-bold text-jhu-blue font-sora">
                  {program.price}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-16">
  <Link
    to="/top-medical-courses"
    className="bg-gradient-to-br from-[#5A8FA0] to-[#4D7F90] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 group uppercase tracking-wide font-sora"
  >
    <FaPlay className="group-hover:scale-110 transition-transform duration-300" />
    View All Programs
    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
  </Link>
</div>
      </div>
    </section>
  )
}

export default FeaturedProgramsSection