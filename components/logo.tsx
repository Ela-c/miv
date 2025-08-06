import React from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Black square background */}
        <rect width="100" height="100" fill="black" rx="8" />
        
        {/* Forehead/Hair - medium rounded white shape in top-left */}
        <path
          d="M15 15 Q15 35 35 35 Q55 35 55 15 Z"
          fill="white"
        />
        
        {/* Nose - medium triangular white shape extending from left edge */}
        <path
          d="M8 38 L22 38 L22 45 L8 45 Z"
          fill="white"
        />
        
        {/* Mouth/Chin - medium white semi-circle */}
        <path
          d="M32 50 A8 8 0 0 1 48 50 L48 58 L32 58 Z"
          fill="white"
        />
        
        {/* Eye/Eyebrow - medium white crescent shape */}
        <path
          d="M58 28 A6 6 0 0 1 72 28 A4 4 0 0 1 58 28 Z"
          fill="white"
        />
        
        {/* Ear/Back of head - medium white semi-circle extending from right edge */}
        <path
          d="M72 28 A15 15 0 0 1 72 58 L85 58 L85 28 Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default Logo 