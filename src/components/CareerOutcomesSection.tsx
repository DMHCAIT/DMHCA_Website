import { 
  FaTrophy,
  FaChartLine,
  FaGlobe,
  FaArrowUp
} from 'react-icons/fa'

const CareerOutcomesSection = () => {
  const outcomeStats = [
    {
      icon: <FaChartLine className="text-white text-3xl" />,
      number: "95%",
      label: "Placement Rate",
      description: "of our graduates secure positions within 6 months"
    },
    {
      icon: <FaArrowUp className="text-white text-3xl" />,
      number: "40%",
      label: "Salary Increase", 
      description: "average salary boost after program completion"
    },
    {
      icon: <FaGlobe className="text-white text-3xl" />,
      number: "50+",
      label: "Countries",
      description: "where our alumni practice medicine"
    },
    {
      icon: <FaTrophy className="text-white text-3xl" />,
      number: "2000+",
      label: "Success Stories",
      description: "of career transformations and achievements"
    }
  ]



  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/20">Career Success</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Career Outcomes
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Our graduates achieve remarkable success across diverse healthcare sectors, from leading hospitals to innovative startups.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {outcomeStats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border-l-4 border-jhu-gold p-6 sm:p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-jhu-gold mb-2 font-sora">
                {stat.number}
              </div>
              <div className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 font-sora">{stat.label}</div>
              <p className="text-xs sm:text-sm text-white/80">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CareerOutcomesSection