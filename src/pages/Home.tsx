import Hero from '../components/Hero'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import FeaturedProgramsSection from '../components/FeaturedProgramsSection'
import LearningExperienceSection from '../components/LearningExperienceSection'
import InternationalAccreditationSection from '../components/InternationalAccreditationSection'
import CareerOutcomesSection from '../components/CareerOutcomesSection'
import UniversityPartnersSection from '../components/UniversityPartnersSection'
import TestimonialsSection from '../components/TestimonialsSection'

const Home = () => {
  return (
    <div className="relative">

      {/* Hero Section - Fixed */}
      <Hero />

      {/* Content Sections that scroll over hero */}
      <div className="relative z-30 mt-[100vh]">
        <WhyChooseUsSection />
        <FeaturedProgramsSection />
        <InternationalAccreditationSection />
        <LearningExperienceSection />
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#4D6A92] via-[#5A8FA0] to-[#4D6A92] relative z-20">
          <CareerOutcomesSection />
          <UniversityPartnersSection />
        </section>
        <TestimonialsSection />
      </div>
    </div>
  )
}

export default Home