import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls, Stars } from '@react-three/drei'
import { sunc, earthc } from './Planetsdata'
export const Planet = (props) => {

    const [Map, Sun, Earth] = useLoader(TextureLoader, [props.type, sunc, earthc])

    console.log(Map)

    const ref = useRef()
    const earthref = useRef()

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        ref.current.rotation.y = - elapsedTime / 6;
        earthref.current.rotation.y = - elapsedTime / 4;
    });

    return (
        <>
            <ambientLight intensity={0.05} position={[0, 0, 32]} />
            <pointLight color="#ffffff" position={[0, 0, 31]} intensity={1.4} />
            <Stars radius={300} depth={30} count={10000} factor={10} saturation={0} fade={true} />
            <mesh ref={ref}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshPhongMaterial color="red" />
                <meshStandardMaterial map={Map} metalness={0} roughness={1} />
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomspeed={0.6} panSpeed={0.5} rotateSpeed={0.4} />
            </mesh>
            <mesh visible position={[0, 0, 32]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial map={Sun} />
            </mesh>
            <mesh visible position={[-7, 3, -5]} ref={earthref} onClick={() => props.toEarth()}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial map={Earth} />
            </mesh>
        </>
    )
}
