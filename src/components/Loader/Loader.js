import React from 'react'
import "./Loader.scss"

export const Loader = ({width,height,color}) => {
  return (
<div class="loader"
style={{'--loader-width':`${width}px`,'--loader-height':`${height}px`,'--loader-color':`${color}`}}
>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
  )
}
