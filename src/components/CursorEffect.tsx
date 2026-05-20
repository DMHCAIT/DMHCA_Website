import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
}

const CursorEffect = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [lastMoveTime, setLastMoveTime] = useState(0)

  useEffect(() => {
    let starId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      
      // Throttle star creation to every 50ms for more frequent stars
      if (now - lastMoveTime < 50) return
      
      setLastMoveTime(now)

      // Create new star at cursor position with slight random offset
      const offsetX = (Math.random() - 0.5) * 25
      const offsetY = (Math.random() - 0.5) * 25

      const newStar: Star = {
        id: starId++,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        rotation: Math.random() * 360,
        scale: 1.0 + Math.random() * 0.6, // Random size between 1.0 and 1.6
      }

      setStars((prevStars) => [...prevStars, newStar])

      // Remove star after animation duration (900ms)
      setTimeout(() => {
        setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id))
      }, 900)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [lastMoveTime])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-star-fade"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            transform: `translate(-50%, -50%) rotate(${star.rotation}deg) scale(${star.scale})`,
          }}
        >
          {/* Star shape with gradient colors matching website theme */}
          <div className="relative w-5 h-5">
            {/* Glowing effect with wine-red to royal-violet gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-wine-red via-royal-violet to-coral-red rounded-full blur-[4px] opacity-75"></div>
            {/* Star core */}
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                className="text-white"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CursorEffect