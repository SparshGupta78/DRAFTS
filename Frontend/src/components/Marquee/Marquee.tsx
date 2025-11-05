import type { ReactNode } from "react"

type marqueeType = {
  children?: ReactNode,
  className?: string,
  speed?: number
}

const Marquee = ({children, className = '', speed = 4}: marqueeType) => {
  const contentLength = (typeof children === 'string' && children.length >= 10) ? children.length : 20
  const safeSpeed = speed && speed > 0 ? speed : 4
  const animateTime = contentLength / safeSpeed
  return (
    <div className={`w-full overflow-hidden whitespace-nowrap box-border ${className}`}>
      <div 
        className="inline-block min-w-full pl-[calc(100%+10px)]"
        style={{ animation: `marquee ${animateTime}s linear infinite` }}>
        <span className="">{children}</span>
      </div>
    </div>
  )
}

export default Marquee