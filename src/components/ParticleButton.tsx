import { ReactNode } from 'react'
import ParticleBackground from './ParticleBackground'

interface ParticleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const ParticleButton = ({ children, className = '', onClick }: ParticleButtonProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} onClick={onClick}>
      {/* Particle Background */}
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>
      
      {/* Button Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ParticleButton
