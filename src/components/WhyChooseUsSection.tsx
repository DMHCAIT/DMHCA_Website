import { 
  FaStethoscope,
  FaUserMd, 
  FaGraduationCap, 
  FaAward
} from 'react-icons/fa'
// ParticleBackground removed — not used

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <FaStethoscope className="text-jhu-spirit-blue text-3xl" />,
      title: "Expert Faculty",
      description: "Learn from renowned medical professionals and industry experts with years of clinical experience."
    },
    {
      icon: <FaUserMd className="text-jhu-spirit-blue text-3xl" />,
      title: "Practical Training",
      description: "Hands-on experience with real-world medical scenarios and clinical case studies."
    },
    {
      icon: <FaGraduationCap className="text-jhu-spirit-blue text-3xl" />,
      title: "Recognized Degrees",
      description: "Globally recognized certifications and degrees from accredited medical institutions."
    },
    {
      icon: <FaAward className="text-jhu-spirit-blue text-3xl"/>,
      title: "Career Support",
      description: "Comprehensive placement assistance and career guidance throughout your journey."
    }
  ]

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#4D6A92] via-[#5A8FA0] to-[#4D6A92] relative x-20 y-30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/20">Why Choose Us</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Excellence in Medical Education
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            We are committed to providing exceptional medical education that transforms careers and lives through innovative learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border-l-4 border-jhu-gold p-6 sm:p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-md">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 font-sora">{feature.title}</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 sm:p-8 md:p-12 text-white">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className=" border-jhu-gold pl-4">
              <div className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-jhu-gold">5000+</div>
              <div className="font-inter text-white/80 text-xs sm:text-sm uppercase tracking-wide">Students Enrolled</div>
            </div>
            <div className="border-l-2 border-jhu-gold pl-4">
              <div className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-jhu-gold">50+</div>
              <div className="font-inter text-white/80 text-xs sm:text-sm uppercase tracking-wide">Expert Faculty</div>
            </div>
            <div className="border-l-2 border-jhu-gold pl-4">
              <div className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-jhu-gold">95%</div>
              <div className="font-inter text-white/80 text-xs sm:text-sm uppercase tracking-wide">Success Rate</div>
            </div>
            <div className="border-l-2 border-jhu-gold pl-4">
              <div className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-jhu-gold">20+</div>
              <div className="font-inter text-white/80 text-xs sm:text-sm uppercase tracking-wide">Specializations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection