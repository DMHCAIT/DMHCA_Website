import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const UniversityPartnersSection = () => {
  const [dbPartners, setDbPartners] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await supabase
          .from('partners')
          .select('*')
          .eq('partner_type', 'university')
          .eq('is_active', true)
          .order('display_order')
        if (data && data.length > 0) setDbPartners(data)
      } catch (_) {}
    })()
  }, [])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/20">Academic Partners</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Official Partners
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Globally recognized degrees from government-accredited universities with UGC approval
          </p>
        </div>

        {/* University Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          
          {dbPartners.length > 0 ? dbPartners.map(partner => (
            <div key={partner.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 border-jhu-gold shadow-xl">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <FaCheckCircle className="text-jhu-gold text-base sm:text-xl" />
                  <span className="text-jhu-gold font-semibold text-xs sm:text-sm">✓ Verified Official Partner</span>
                </div>
                <div className="mb-4 sm:mb-6">
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={partner.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg mb-3" />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-jhu-gold rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white font-bold text-xl">{partner.name?.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{partner.name}</div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md mb-4 sm:mb-6">{partner.description}</p>
                {partner.website_url && (
                  <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-jhu-gold hover:underline text-sm">Visit Website →</a>
                )}
              </div>
            </div>
          )) : (
          <>
          {/* Himalayan University */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 border-jhu-gold shadow-xl">
            <div className="flex flex-col items-center text-center">
              {/* Verified Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaCheckCircle className="text-jhu-gold text-base sm:text-xl" />
                <span className="text-jhu-gold font-semibold text-xs sm:text-sm">✓ Verified Official Partner</span>
              </div>
              
              {/* University Logo */}
              <div className="mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">HU</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">HIMALAYAN</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-jhu-gold mt-1">UNIVERSITY</div>
              </div>

              {/* University Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md mb-4 sm:mb-6">
                Established by the Government of Arunachal Pradesh and recognized by the UGC, the university was awarded for "Outstanding Contribution to Community Services" at the 2023 Education Fair and ranks among the top 100 universities in India. The University has 03 campuses situated at Itanagar (Main Campus), Naharlagun, & Tawang.
              </p>
              
              {/* Accreditation Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <span className="bg-jhu-gold/20 text-jhu-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-gold/30">UGC Recognized</span>
                <span className="bg-jhu-gold/20 text-jhu-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-gold/30">Gov. Approved</span>
                <span className="bg-jhu-gold/20 text-jhu-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-gold/30">Top 100 India</span>
              </div>
            </div>
          </div>

          {/* Bir Tikendrajit University */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 border-jhu-spirit-blue">
            <div className="flex flex-col items-center text-center">
              {/* Verified Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaCheckCircle className="text-jhu-spirit-blue text-base sm:text-xl" />
                <span className="text-jhu-spirit-blue font-semibold text-xs sm:text-sm">✓ Verified Official Partner</span>
              </div>
              
              {/* University Logo */}
              <div className="mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">BTU</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">BIR TIKENDRAJIT</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-jhu-gold mt-1">UNIVERSITY</div>
              </div>

              {/* University Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md mb-4 sm:mb-6">
                Bir Tikendrajit University, Manipur is established by the Manipur Government as an Act No. 9 of 2020 and under u/s 2(f) of UGC act 1956. Respecting expertise and knowledge for its own sake and behaving ethically in all interactions at all levels, the University conducts research, teaching and learning.
              </p>
              
              {/* Accreditation Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <span className="bg-jhu-spirit-blue/20 text-jhu-spirit-blue px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-spirit-blue/30">UGC Recognized</span>
                <span className="bg-jhu-spirit-blue/20 text-jhu-spirit-blue px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-spirit-blue/30">Gov. Approved</span>
                <span className="bg-jhu-spirit-blue/20 text-jhu-spirit-blue px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border border-jhu-spirit-blue/30">Act 9 of 2020</span>
              </div>
            </div>
          </div>
          </>
          )}

        </div>
      </div>
    </>
  )
}

export default UniversityPartnersSection