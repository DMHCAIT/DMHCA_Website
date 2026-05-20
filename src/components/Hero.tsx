import { FaPause, FaPlay } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Hero = () => {
  const [isVideoPaused, setIsVideoPaused] = useState(false)
  const [heroSettings, setHeroSettings] = useState<{ videoUrl?: string; title?: string; subtitle?: string } | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'hero').single()
        if (data?.value) {
          const val = typeof data.value === 'string' ? JSON.parse(data.value) : data.value
          setHeroSettings(val)
        }
      } catch (_) {}
    })()
  }, [])

  const videoUrl = heroSettings?.videoUrl ?? 'https://videos.pexels.com/video-files/7615384/7615384-uhd_2560_1440_25fps.mp4'
  const heroTitle = heroSettings?.title ?? 'DMHCA'
  const heroSubtitle = heroSettings?.subtitle ?? 'DELHI MEDICAL HEALTH CARE ACADEMY'

  const toggleVideo = () => {
    const video = document.querySelector('#hero-video') as HTMLVideoElement
    if (video) {
      if (isVideoPaused) {
        video.play()
      } else {
        video.pause()
      }
      setIsVideoPaused(!isVideoPaused)
    }
  }

  return (
    <section id="hero" className="h-screen overflow-hidden fixed top-0 left-0 right-0 z-10">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          id="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Medical/Healthcare themed video background */}
          <source src={videoUrl} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Video Control Button (Bottom Left) */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center border border-white/30 z-30"
          aria-label={isVideoPaused ? 'Play video' : 'Pause video'}
        >
          {isVideoPaused ? <FaPlay className="text-lg ml-1" /> : <FaPause className="text-lg" />}
        </button>
      </div>
      
      {/* Hero Content - Centered Logo and Text */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          {/* Logo/Shield */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/30 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 text-white fill-current">
                <path d="M50 5 L85 20 L85 50 Q85 75 50 95 Q15 75 15 50 L15 20 Z" />
                <circle cx="50" cy="45" r="15" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </div>
          
          {/* Main Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight font-sora tracking-wider">
            {heroTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 tracking-widest uppercase font-sora">
  {heroSubtitle}
</p>
        </div>
      </div>
    </section>
  )
}

export default Hero