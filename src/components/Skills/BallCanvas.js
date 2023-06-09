import React, { Suspense } from 'react'
import {Canvas} from "@react-three/fiber"
import variables from "../../variables.scss"
import {Decal,Float,OrbitControls,Preload,useTexture} from '@react-three/drei'

const Ball = (props) => {
  const textures = useTexture([props.imgUrl])
  const decal = textures[0]
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[0,0,0.05]}/>
      <mesh castShadow receiveShadow scale={2.5} >
        <icosahedronGeometry args={[1,2,2]}/>
        <meshStandardMaterial
          color ={variables.lavenderColor}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0, 0, 1]}
          flatShading
          rotation={[ 2 * Math.PI, 0, 6.25]}
          map={decal}
          scale={[0.9,0.9,1]}
        />
      </mesh>
    </Float>
  )
}
const BallCanvas = React.memo(({icon}) => {
  return (
    <Canvas style={{width:'250px'}} className='canvas'
      frameloop="always"
      gl={{
        powerPreference: "low-power",
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <Suspense fallback={null}>
      <OrbitControls
        enableRotate={true}
        enableZoom={false}
        enablePan={false}
      />
        <Ball imgUrl={icon}/>
      </Suspense>
        <Preload all/>
    </Canvas>
  )
})
export default BallCanvas