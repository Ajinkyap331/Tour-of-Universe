import React, { useState, Suspense } from 'react'
import { Earth } from './Earth'
import { Canvas } from '@react-three/fiber';
import './RenderCanvas.css'

export const RenderCanvas = (props) => {

    // const [loading, setloading] = useState(true)

    return (

        <>
            <div style={{ position: 'absolute', width: '100vw', textAlign: 'center' }}>
                <h2 id = "title">Welcome to Life of The Universe</h2>
                <h2 id="loader">Please Wait While Loading...</h2>
            </div>
            <Canvas>
                <Suspense fallback={null}>
                    <Earth toMoon = {props.toMoon}/>
                </Suspense>
            </Canvas>
        </>

    )
}
