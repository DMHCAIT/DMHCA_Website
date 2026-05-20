import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaUserMd,
  FaGraduationCap,
  FaHeart
} from 'react-icons/fa'
import ParticleBackground from './ParticleBackground'

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('testimonials').select('*').eq('is_active', true).order('display_order')
        if (data && data.length > 0) setDbTestimonials(data)
      } catch (_) {}
    })()
  }, [])

  const hardcodedTestimonials = [
    {
      name: "Dr. Jakaria (Ahsan Habib)",
      role: "Endocrinologist",
      program: "Fellowship in Endocrinology",
      location: "Bangladesh",
      rating: 5,
      image: "👨‍⚕️",
      quote: "Hi I am Dr.Jakaria from Bangladesh. I have completed the fellowship on endocrinology course from here. Their educational system is very good.. thanks to DMHCA.",
      highlight: "Excellent educational system"
    },
    {
      name: "Dr. Pragya Rajbhandari",
      role: "Pediatric Neurologist",
      program: "Fellowship in Pediatric Neurology",
      location: "Jaipur",
      rating: 5,
      image: "👩‍⚕️",
      quote: "My journey through the Pediatric Neurology Fellowship Program at your institute has been an incredibly rewarding experience. I've gained valuable clinical knowledge, hands-on training, and deepened my understanding of neurological conditions in children. Thank you for everything 🙏🙏🙏🙏",
      highlight: "Rewarding journey with hands-on training"
    },
    {
      name: "Dr. Shahjad Khan",
      role: "Diabetologist",
      program: "Fellowship in Diabetology",
      location: "Lucknow",
      rating: 5,
      image: "👨‍⚕️",
      quote: "I recently completed the Fellowship in Diabetology at DMHCA, and it has been a transformative journey in my medical career. The program is well-structured, combining updated theoretical modules with excellent hands-on clinical training.",
      highlight: "Transformative journey in medical career"
    },
    {
      name: "Dr. Rahul Jain",
      role: "Medical Professional",
      program: "Fellowship Course",
      location: "Mumbai",
      rating: 5,
      image: "👨‍⚕️",
      quote: "Very genuine and trustworthy platform for doing fellowship in various courses. Admin team, consultation team are very helpful specially my guide from consultation team Mr Akshay Suryavanshi is very polite, co-operative and kind person. Thanks to DMHCA",
      highlight: "Genuine and trustworthy platform"
    },
    {
      name: "Dr. Moomin Ahmad Mir",
      role: "Critical Care Specialist",
      program: "Fellowship in Critical Care",
      location: "Kashmir",
      rating: 5,
      image: "👨‍⚕️",
      quote: "I am truly grateful to Delhi Medical Health Care Academy for providing me the opportunity to pursue a Fellowship in Critical Care. The admission process was extremely smooth and hassle-free. The staff members are very helpful and supportive, always ready to guide students at every step. Thanks Guys…",
      highlight: "Smooth admission, helpful staff"
    },
    {
      name: "Dr. Manisha Kumari",
      role: "Family Medicine Specialist",
      program: "Fellowship in Family Medicine",
      location: "New Delhi",
      rating: 5,
      image: "👩‍⚕️",
      quote: "Highly recommend for the fellowship courses. I completed the fellowship in family medicine. It was a great learning experience. Very happy with the course content and faculty. Thank you team DMHCA",
      highlight: "Great learning experience"
    }
  ]

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials.map(t => ({
    ...t,
    image: t.image_url ?? '👨‍⚕️'
  })) : hardcodedTestimonials

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 1000) // Change slide every 1 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length])

  const stats = [
    { number: "4.9/5", label: "Average Rating", icon: <FaStar className="text-yellow-500" /> },
    { number: "2500+", label: "Happy Students", icon: <FaGraduationCap className="text-slate-500" /> },
    { number: "98%", label: "Recommend Us", icon: <FaHeart className="text-slate-500" /> },
    { number: "50+", label: "Countries", icon: <FaUserMd className="text-slate-500" /> }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-lavender-tint to-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our <span className="text-jhu-gold">Students Say</span>
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from thousands of healthcare professionals who have transformed their careers with DMHCA's world-class programs.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Testimonial Slider */}
        <div 
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute top-8 left-8 text-6xl text-wine-red/20">
            <FaQuoteLeft />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 transition-all duration-500 ease-in-out">
              {/* Testimonial Content */}
              <div key={currentSlide} className="flex-1 animate-fadeIn">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentSlide].quote}"
                </blockquote>
                
                <div className="bg-lavender-tint rounded-xl p-4 mb-6">
                  <div className="text-sm font-semibold text-wine-red mb-1">Key Highlight:</div>
                  <div className="text-gray-700">{testimonials[currentSlide].highlight}</div>
                </div>
              </div>

              {/* Student Profile */}
              <div key={`profile-${currentSlide}`} className="text-center md:text-left animate-fadeIn">
                <div className="w-24 h-24 text-5xl bg-gradient-to-br from-wine-red to-royal-violet rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                  {testimonials[currentSlide].image}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  {testimonials[currentSlide].name}
                </h4>
                <p className="text-wine-red font-semibold mb-2">
                  {testimonials[currentSlide].role}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  {testimonials[currentSlide].program}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonials[currentSlide].location}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-gray-100 hover:bg-wine-red hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <FaChevronLeft />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-wine-red w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-gray-100 hover:bg-wine-red hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden text-center rounded-2xl p-12 text-white mt-16">
          <div className="absolute inset-0 z-0">
            <ParticleBackground />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Thousands of Successful Graduates
            </h3>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Start your transformation journey today and become the next success story at DMHCA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/apply" className="bg-white text-wine-red px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                Apply Now
              </Link>
              <Link to="/success-stories" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-wine-red hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                Watch More Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection