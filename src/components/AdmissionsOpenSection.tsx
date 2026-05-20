import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaClock,
  FaFire,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaGift,
  FaLightbulb
} from 'react-icons/fa'
import ParticleBackground from './ParticleBackground'

const AdmissionsOpenSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const urgencyFeatures = [
    { icon: <FaUsers className="text-slate-500 text-3xl" />, text: "Limited seats available", highlight: "Only 50 spots left" },
    { icon: <FaGift className="text-slate-500 text-3xl" />, text: "Early bird discount", highlight: "Save ₹25,000" },
    { icon: <FaCalendarAlt className="text-slate-500 text-3xl" />, text: "Next batch starts", highlight: "March 15, 2026" },
    { icon: <FaLightbulb className="text-slate-500 text-3xl" />, text: "Free career counseling", highlight: "Worth ₹5,000" }
  ]

  const benefits = [
    "✓ Industry-recognized certification",
    "✓ 100% placement assistance",
    "✓ Flexible payment options",
    "✓ Lifetime alumni access",
    "✓ 24/7 student support",
    "✓ Mobile learning platform"
  ]

  return (
    <section id="admissions-open" className="py-20 relative z-20 overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#5A8FA0] to-[#4D6A92]">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with Urgency */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-coral-red rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">ADMISSIONS NOW OPEN</span>
            <FaFire className="text-coral-red animate-bounce" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8">
            Secure your spot in India's most sought-after medical programs. Applications closing soon!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <FaClock className="text-coral-red" />
              Application Deadline
            </h3>
            <p className="text-gray-200">Hurry up! Time is running out</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text bg-gradient-to-r from-wine-red to-royal-violet bg-clip-text text-transparent mb-2">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 capitalize font-semibold">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Urgency Features */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Why Apply Now?
            </h3>
            
            <div className="space-y-6 mb-8">
              {urgencyFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">{feature.text}</div>
                      <div className="text-coral-red font-bold">{feature.highlight}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4">What You Get:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-200">
                    <FaCheckCircle className="text-slate-500 text-sm flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Application Form Preview */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">Quick Application</h4>
              <p className="text-gray-600">Secure your seat in just 2 minutes</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-wine-red rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <span className="text-sm font-medium text-wine-red">Step 1</span>
              </div>
              <div className="flex-1 h-1 bg-wine-red mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="text-sm text-gray-500">Step 2</span>
              </div>
            </div>

            {/* Form Fields Preview */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-red"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-red"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Program Interest *</label>
                <select className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-red">
                  <option>Select a program</option>
                  <option>PG Diploma in General Medicine</option>
                  <option>Fellowship in Cardiology</option>
                  <option>PG Diploma in Neurology</option>
                </select>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Link to="/apply" className="w-full gradient-primary text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                Apply Now - Save ₹25,000
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full border-2 border-wine-red text-wine-red py-4 px-6 rounded-xl font-bold text-lg hover:bg-wine-red hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Download Brochure First
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-green-500" />
                <span>Secure Application</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-green-500" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Alert */}
        <div className="mt-16 bg-coral-red rounded-2xl p-6 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaFire className="text-2xl animate-bounce" />
            <span className="text-xl font-bold">LAST CHANCE ALERT!</span>
            <FaFire className="text-2xl animate-bounce" />
          </div>
          <p className="text-lg">
            Applications close in <strong>{timeLeft.days} days</strong>. Don't let this opportunity slip away!
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdmissionsOpenSection