import { useLoader, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import dayMap from '../Images/8k_earth_daymap.jpg'
import cloudMap from '../Images/storm_clouds_8k.jpg'
import mercury from '../Images/2k_mercury.jpg'
import svenus from '../Images/2k_venus_surface.jpg'
import cvenus from '../Images/2k_venus_atmosphere.jpg'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from "three";
import { sunc, moonc } from './Planetsdata'


export const Earth = (props) => {

    const [DayMap, CloudMap, Sun, Moon, Mercury, SVenus, Cvenus] = useLoader(TextureLoader, [dayMap, cloudMap, sunc, moonc, mercury, svenus, cvenus])

    const { _, camera } = useThree()

    const earthref = useRef()
    const moonref = useRef()
    const mercuryref = useRef()
    const venusref = useRef()
    const cloudref = useRef()


    camera.position.z = 900;
    camera.position.y = 1.2;
    let l = 850, d = 0;


    useFrame(({ clock }) => {

        const elapsedTime = clock.getElapsedTime()
        earthref.current.rotation.y = elapsedTime / 4;
        mercuryref.current.rotation.y = elapsedTime/4;  
        venusref.current.rotation.y = elapsedTime / 4; 
        cloudref.current.rotation.y = elapsedTime / 4;
        moonref.current.rotation.y = elapsedTime / 4;
        if (l < 504 && l > 499) {
            l -= 0.01
            d = -0.001
            document.getElementById("title").innerHTML = "Earth"
        }
        else if (l < 520 && l > 504) {
            l -= 0.1
            d = -0.003
        }
        else if (l < 604 && l > 599) {
            l -= 0.01
            d = -0.001
            document.getElementById("title").innerHTML = "Venus"
        }
        else if (l < 620 && l > 604) {
            l -= 0.1
            d = -0.003
        }
        else if (l < 704 && l > 699) {
            l -= 0.01
            d = -0.001
            document.getElementById("title").innerHTML = "Mercury"
        }
        else if (l < 720 && l > 704) {
            l -= 0.1    
            d = -0.003
        }
        else {
            document.getElementById("title").innerHTML = ""
            camera.rotation.x = 0;
            l -= 0.3;
        }

        camera.position.z = l;
        camera.rotateX(d)
    });

    const changeText = () => {
        document.getElementById("title").innerHTML = ""
        document.getElementById("loader").innerHTML = ""
    }


    useEffect(() => changeText(), [Moon])


    return (
        <>
            <>
                <ambientLight intensity={0.1} />
                <pointLight color="#ffffff" position={[0, 50, 850]} intensity={1.4}  />
                <Stars radius={500} depth={50} count={20000} factor={10} saturation={0} fade={true} />
                <mesh visible position={[0, 0, 500]} ref={cloudref}>
                    <sphereGeometry args={[1.005, 32, 32]} />
                    <meshPhongMaterial color='red' />
                    <meshStandardMaterial map={CloudMap} opacity={0.4} transparent={true} depthWrite={true} side={THREE.DoubleSide} />
                </mesh>
                <mesh visible position={[0, 0, 500]} ref={earthref} >
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhongMaterial color='red' />
                    <meshStandardMaterial map={DayMap} metalness={0.6} roughness={0.7} />
                    {/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomspeed={0.6} panSpeed={0.5} rotateSpeed={0.4} /> */}
                </mesh>
                <mesh visible position={[0, 0, 800]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial map={Sun} />
                </mesh>
                <mesh visible position={[-7, 3, 500]} ref={moonref} onClick={() => props.toMoon()}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial map={Moon} />
                </mesh>
                <mesh visible position={[0, 0, 700]} ref={mercuryref}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial map={Mercury} />
                </mesh>
                <mesh visible position={[0, 0, 600]} ref={venusref} >
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial map={SVenus} />
                </mesh>
                <mesh visible position={[0, 0, 600]} >
                    <sphereGeometry args={[1.005, 32, 32]} />
                    <meshPhongMaterial color='red' />
                    <meshStandardMaterial map={Cvenus} opacity={0.4} transparent={true} depthWrite={true} side={THREE.DoubleSide} />
                </mesh>
            </>
        </>

    )
}
