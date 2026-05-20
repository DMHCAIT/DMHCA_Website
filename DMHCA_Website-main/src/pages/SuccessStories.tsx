import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaUsers, 
  FaHandshake, 
  FaStar,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaUserMd,
  FaHospital,
  FaArrowUp,
  FaMoneyBillWave,
  FaArrowLeft
} from 'react-icons/fa'

const SuccessStories = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const allSuccessStories = [
    {
      name: "Dr. Sarah Chen",
      program: "PG Diploma in Cardiology",
      outcome: "Chief Cardiologist at Singapore General Hospital",
      quote: "The program's comprehensive curriculum and expert mentorship transformed my career trajectory completely.",
      location: "Singapore",
      yearGraduated: "2022",
      salaryIncrease: "85%",
      currentPackage: "₹65 LPA"
    },
    {
      name: "Dr. Rajesh Kumar",
      program: "Fellowship in Neurology",
      outcome: "Founded Neurological Disorders Clinic",
      quote: "DMHCA's practical approach gave me the confidence to start my own specialized practice.",
      location: "Mumbai, India",
      yearGraduated: "2021",
      salaryIncrease: "120%",
      currentPackage: "₹48 LPA"
    },
    {
      name: "Dr. Maria Rodriguez",
      program: "PG Diploma in Emergency Medicine",
      outcome: "Emergency Department Director, Madrid",
      quote: "The international exposure and case-based learning prepared me for leadership roles.",
      location: "Madrid, Spain",
      yearGraduated: "2023",
      salaryIncrease: "70%",
      currentPackage: "₹52 LPA"
    },
    {
      name: "Dr. Ahmed Hassan",
      program: "Fellowship in Pediatrics",
      outcome: "Head of Pediatrics, Dubai Healthcare City",
      quote: "DMHCA's world-class faculty and flexible learning model helped me advance while practicing.",
      location: "Dubai, UAE",
      yearGraduated: "2022",
      salaryIncrease: "95%",
      currentPackage: "₹72 LPA"
    },
    {
      name: "Dr. Jessica Williams",
      program: "PG Diploma in Orthopedics",
      outcome: "Orthopedic Surgeon, Johns Hopkins Hospital",
      quote: "The cutting-edge surgical techniques I learned have made me a be leader in my field.",
      location: "Baltimore, USA",
      yearGraduated: "2023",
      salaryIncrease: "110%",
      currentPackage: "₹80 LPA"
    },
    {
      name: "Dr. Amit Patel",
      program: "Fellowship in Gastroenterology",
      outcome: "Established Multi-Specialty Digestive Care Center",
      quote: "From student to successful entrepreneur - DMHCA gave me both knowledge and confidence.",
      location: "London, UK",
      yearGraduated: "2020",
      salaryIncrease: "150%",
      currentPackage: "₹55 LPA"
    },
    {
      name: "Dr. Lisa Thompson",
      program: "PG Diploma in Dermatology",
      outcome: "Senior Consultant, Mayo Clinic",
      quote: "The research opportunities and clinical exposure during my program were unparalleled.",
      location: "Rochester, USA",
      yearGraduated: "2022",
      salaryIncrease: "60%",
      currentPackage: "₹58 LPA"
    },
    {
      name: "Dr. Yuki Tanaka",
      program: "Fellowship in Oncology",
      outcome: "Lead Oncologist, Tokyo Medical University",
      quote: "DMHCA's focus on precision medicine prepared me for the future of oncology.",
      location: "Tokyo, Japan",
      yearGraduated: "2021",
      salaryIncrease: "75%",
      currentPackage: "₹62 LPA"
    },
    {
      name: "Dr. Michael O'Brien",
      program: "PG Diploma in Psychiatry",
      outcome: "Director of Mental Health Services, Sydney",
      quote: "The holistic approach to mental health education has shaped my entire practice philosophy.",
      location: "Sydney, Australia",
      yearGraduated: "2023",
      salaryIncrease: "55%",
      currentPackage: "₹46 LPA"
    },
    {
      name: "Dr. Fatima Al-Masri",
      program: "Fellowship in Radiology",
      outcome: "Chief Radiologist, King Faisal Hospital",
      quote: "The advanced imaging techniques and AI integration training set me apart in diagnostic medicine.",
      location: "Riyadh, Saudi Arabia",
      yearGraduated: "2022",
      salaryIncrease: "90%",
      currentPackage: "₹68 LPA"
    },
    {
      name: "Dr. Carlos Mendez",
      program: "PG Diploma in Anesthesiology",
      outcome: "Head of Anesthesiology Department, Barcelona",
      quote: "The comprehensive pain management training opened new career pathways for me.",
      location: "Barcelona, Spain",
      yearGraduated: "2021",
      salaryIncrease: "65%",
      currentPackage: "₹50 LPA"
    },
    {
      name: "Dr. Priya Nair",
      program: "Fellowship in Endocrinology",
      outcome: "Founded Diabetes Care Foundation",
      quote: "DMHCA inspired me to not just treat patients, but to create systemic change in healthcare.",
      location: "Bangalore, India",
      yearGraduated: "2020",
      salaryIncrease: "140%",
      currentPackage: "₹42 LPA"
    }
  ]

  const stats = [
    {
      icon: <FaUsers className="text-3xl text-white" />,
      number: "2000+",
      label: "Success Stories"
    },
    {
      icon: <FaBriefcase className="text-3xl text-white" />,
      number: "95%",
      label: "Career Advancement"
    },
    {
      icon: <FaAward className="text-3xl text-white" />,
      number: "40%",
      label: "Salary Growth"
    },
    {
      icon: <FaHospital className="text-3xl text-white" />,
      number: "50+",
      label: "Countries"
    }
  ]

  return (
    <div className="bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FaBriefcase className="text-2xl sm:text-3xl text-white" />
          </div>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Your Success is <span className="text-jhu-gold">Our Priority</span>
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized career guidance, interview preparation, and networking opportunities throughout your journey and beyond graduation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center text-white border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-center mb-3 sm:mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-jhu-gold font-sora">{stat.number}</div>
              <div className="text-xs sm:text-sm font-medium text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Career Support CTA */}
        <div className="bg-white rounded-3xl p-12 mb-16 shadow-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            We Support Your Career Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            From enrollment to career advancement, we're with you every step of the way. Our dedicated career services team provides personalized guidance, connects you with industry leaders, and helps you achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="gradient-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Schedule Career Counseling
            </button>
            <button className="border-2 border-wine-red text-wine-red px-8 py-4 rounded-xl font-bold text-lg hover:bg-wine-red hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Connect with Alumni
            </button>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Alumni <span className="gradient-text bg-gradient-to-r from-wine-red to-royal-violet bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover how DMHCA graduates are making a difference in healthcare worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSuccessStories.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-wine-red to-royal-violet rounded-xl flex items-center justify-center">
                  <FaUserMd className="text-white text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.location}</p>
                </div>
                <div className="text-xs text-gray-400">
                  Class of {story.yearGraduated}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaGraduationCap className="text-slate-500" />
                  <p className="text-sm font-medium text-gray-700">{story.program}</p>
                </div>
                
                {/* Salary Growth Badge */}
                <div className="flex gap-2 mb-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <FaArrowUp className="text-green-600 text-sm" />
                    <span className="text-xs font-bold text-green-700">{story.salaryIncrease} Growth</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-600 text-sm" />
                    <span className="text-xs font-bold text-blue-700">{story.currentPackage}</span>
                  </div>
                </div>
                
                <div className="bg-lavender-tint rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaAward className="text-slate-500" />
                    <p className="text-sm font-semibold text-gray-700">Current Position</p>
                  </div>
                  <p className="text-sm text-gray-700">{story.outcome}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 italic">"{story.quote}"</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <FaHandshake className="text-slate-500" />
                  <span className="text-xs text-gray-600">Verified Graduate</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xs" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who have transformed their careers with DMHCA
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/apply" className="bg-white text-wine-red px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                Apply Now
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-wine-red hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessStories
