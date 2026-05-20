import { 
  FaLaptop,
  FaStethoscope,
  FaChartLine,
  FaMicroscope,
  FaGraduationCap
} from 'react-icons/fa'
import ParticleBackground from './ParticleBackground'

const LearningExperienceSection = () => {
  const features = [
    { icon: <FaChartLine className="text-slate-500 text-3xl" />, title: "Progress Tracking", description: "Advanced analytics to track your learning progress and performance" },
    { icon: <FaGraduationCap className="text-slate-500 text-3xl" />, title: "Personalized Learning", description: "Adaptive learning paths tailored to your pace and learning style" },
    { icon: <FaStethoscope className="text-slate-500 text-3xl" />, title: "Clinical Integration", description: "Seamless integration of theoretical knowledge with practical application" },
    { icon: <FaLaptop className="text-slate-500 text-3xl" />, title: "Multi-Device Access", description: "Learn anywhere, anytime on desktop, tablet, or mobile devices" }
  ]

  return (
    <section id="learning-experience" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-jhu-dark mb-4 sm:mb-6">
            Learning <span className="text-jhu-spirit-blue">Experience</span>
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-jhu-gray max-w-3xl mx-auto px-4">
            Immerse yourself in an innovative learning environment that combines cutting-edge technology with proven educational methodologies.
          </p>
        </div>

        {/* Hero Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Left - Content */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Transform Your Learning Journey
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Experience a revolutionary approach to medical education that adapts to your schedule, learning style, and career goals. Our platform combines the best of traditional medical training with modern technology.
            </p>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* Right - Visual/Demo Area */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl">
              <div className="absolute inset-0 z-0">
                <ParticleBackground />
              </div>
              <div className="relative z-10">
                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaLaptop className="text-slate-500 text-3xl" />
                      </div>
                      <div>
                        <div className="font-semibold">Live Session</div>
                        <div className="text-sm text-gray-200">Cardiology Case Study</div>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-coral-red rounded-full animate-pulse"></div>
                  </div>

                    <div className="text-sm">Live Analytics</div>
                  </div>
                </div>
              </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-coral-red rounded-2xl flex items-center justify-center shadow-xl">
              <FaGraduationCap className="text-slate-500 text-3xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <FaMicroscope className="text-slate-500 text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningExperienceSection