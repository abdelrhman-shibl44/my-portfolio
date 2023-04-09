import React from 'react'
import "./Loader.scss"

export const Loader = ({width,height}) => {
  return (
<div class="loader"
style={{'--loader-width':`${width}px`,'--loader-height':`${height}px`}}
>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
  )
}
