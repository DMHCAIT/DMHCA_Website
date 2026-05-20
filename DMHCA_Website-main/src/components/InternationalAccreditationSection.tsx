import { FaCertificate, FaCheckCircle, FaGlobe, FaShieldAlt, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const InternationalAccreditationSection = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }

  return (
    <section id="international-accreditation" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#4D6A92] via-[#5A8FA0] to-[#4D6A92] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Globally <span className="text-jhu-gold">Recognized</span> Certification
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Our programs are accredited by leading international medical bodies and recognized worldwide, ensuring your certification opens doors globally.
          </p>
        </div>
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaGlobe className="text-white text-2xl sm:text-3xl" />
            </div>
            <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Globally Accepted</h4>
            <p className="text-xs text-white/70">Recognized by institutions worldwide</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16   bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaShieldAlt className="text-white text-2xl sm:text-3xl" />
            </div>
            <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Industry Validated</h4>
            <p className="text-xs text-white/70">Endorsed by top professionals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16  bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaCertificate className="text-white text-2xl sm:text-3xl" />
            </div>
            <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Career Enhancing</h4>
            <p className="text-xs text-white/70">Opens advanced opportunities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-jhu-gold rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaCheckCircle className="text-white text-2xl sm:text-3xl" />
            </div>
            <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Blockchain Verified</h4>
            <p className="text-xs text-white/70">Secure digital certification</p>
          </div>
        </div>

        {/* Accreditation Logos */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            Accredited By Leading Institutions
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">
            {/* IBMP Logo */}
            <div className="text-center">
              <div className="flex items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-4">
                <div className="flex items-center gap-4">
                  {/* IBMP Logo Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">IBMP</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-blue-800 tracking-wider">
                    IBMP
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">Verified Partner</span>
              </div>
            </div>

            {/* CPD Standards Office Logo */}
            <div className="text-center">
              <div className="flex items-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-4">
                <div className="flex items-center gap-4">
                  {/* CPD Logo Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">cpd</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-800">CPD Standards Office</div>
                    <div className="text-lg text-cyan-500 font-medium">The Educator's Trustmark</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">Verified Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center">
         
        </div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeDetailsModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-gradient-to-br from-white to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeDetailsModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all"
            >
              <FaTimes className="text-gray-700 text-base sm:text-xl" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 pr-8">
                About Our <span className="gradient-text bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">Accreditation</span>
              </h2>

              {/* IBMP Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-lg">IBMP</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">International Board of Medical Practitioners (IBMP)</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      The IBMP is a globally recognized accreditation body that sets international standards for medical education and professional development. Our partnership with IBMP ensures that all our programs meet rigorous global standards of excellence.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 pl-0 sm:pl-20">
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Recognition across 150+ countries worldwide</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Accepted by major healthcare institutions and hospitals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Enables seamless career progression internationally</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Validates your expertise with world-class medical standards</p>
                  </div>
                </div>
              </div>

              {/* CPD Standards Office Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">cpd</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">CPD Standards Office</h3>
                    <p className="text-xs sm:text-sm text-cyan-600 font-semibold mb-2">The Educator's Trustmark</p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      CPD (Continuing Professional Development) Standards Office is an independent accreditation body that ensures the quality and relevance of professional development programs. Their certification confirms that our courses meet the highest educational standards.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 pl-0 sm:pl-20">
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Internationally recognized CPD certification</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Accredited points for professional development records</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Recognized by professional medical councils</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <p className="text-sm sm:text-base text-gray-700">Demonstrates commitment to continuous learning excellence</p>
                  </div>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why This Matters for Your Career</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <FaGlobe className="text-indigo-500 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Global Mobility</h4>
                      <p className="text-sm text-gray-600">Practice medicine across international borders with recognized credentials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-indigo-500 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Professional Credibility</h4>
                      <p className="text-sm text-gray-600">Build trust with patients and employers through verified qualifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCertificate className="text-indigo-500 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Career Advancement</h4>
                      <p className="text-sm text-gray-600">Unlock senior positions and specialized roles in healthcare</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-indigo-500 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Quality Assurance</h4>
                      <p className="text-sm text-gray-600">Guaranteed high-quality education meeting international standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default InternationalAccreditationSection