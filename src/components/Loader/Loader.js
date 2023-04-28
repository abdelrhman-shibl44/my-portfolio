import React from 'react'
import "./Loader.scss"

export const Loader = ({width,height,color}) => {
  return (
<div className="loader"
style={{'--loader-width':`${width}px`,'--loader-height':`${height}px`,'--loader-color':`${color}`}}
>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
</div>
  )
}
