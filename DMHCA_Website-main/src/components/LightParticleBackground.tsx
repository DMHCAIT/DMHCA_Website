import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const LightParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    // Initialize particles with slower movement
    const initParticles = () => {
      particles.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000) // Fewer particles
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower movement
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5 // Smaller particles
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(162, 198, 233, 0.98)' // Complementary color background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle with glowing colors on dark background
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        )
        
        // Darker colors that work on light background
        const colors = [
          'rgba(90, 143, 160, 0.8)', // accent steel blue
          'rgba(80, 130, 150, 0.8)', // darker teal
          'rgba(70, 120, 140, 0.8)', // dark blue-green
          'rgba(100, 150, 170, 0.8)'  // muted blue
        ]
        const color = colors[i % colors.length]
        
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, 'rgba(162, 198, 233, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.current.forEach((otherParticle, j) => {
          if (i === j) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 120 // Connection distance

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5 // More visible lines
            ctx.strokeStyle = `rgba(90, 143, 160, ${opacity})` // Accent blue connections
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Handle mouse move (optional: particles could react to mouse)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // Setup
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}
    />
  )
}

export default LightParticleBackground
