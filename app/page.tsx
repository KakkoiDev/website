"use client";

import Image from "next/image";
import { Inter, Bebas_Neue } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [isCTAButtonActive, setIsCTAButtonActive] = useState(false);
  const [isCTAButtonInitializing, setIsCTAButtonInitializing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCTAButtonInitializing(true);

      setTimeout(() => {
        setIsCTAButtonActive(true);
        setIsCTAButtonInitializing(false);
      }, 500);
    }, 500);
  }, []);
  return (
    <main className="">
      <nav
        className={`${bebasNeue.className} tracking-[0.2rem] flex justify-between items-center fixed top-0 left-0 right-0 h-20 px-8 backdrop-blur-md z-20`}
      >
        <div className={`text-2xl`}>KakkoiDev</div>
        <div className="flex items-center">
          <div className="hidden sm:block mr-2">Portfolio | Services</div>
          <button
            className={`border-2 border-black px-2 cta
         ${isCTAButtonActive ? "active" : ""}
         `}
            onClick={() => setIsCTAButtonActive((prev) => !prev)}
          >
            <div className="relative top-[2px] tracking-widest">Contact Me</div>
          </button>
        </div>
      </nav>
      <div
        className={`${bebasNeue.className} header h-screen flex flex-col justify-center items-center px-8 text-center`}
      >
        <Canvas className="!absolute">
          <Box position={[0, 0, 0]} />
        </Canvas>
        <div className="z-10 text-5xl sm:text-6xl mb-14 traking-[0.2rem]">
          KakkoiDev Studio
        </div>
        <div className="z-10 text-7xl sm:text-8xl">Web & App</div>
        <div className="z-10 text-6xl sm:text-7xl tracking-[0.4rem]">
          Development
        </div>
        <button
          className={`mt-14 text-4xl border-4 border-black px-4 py-2 active:top-[2px] relative cta ${
            isCTAButtonActive ? "active" : ""
          } ${isCTAButtonInitializing ? "top-[2px]" : ""}`}
          onClick={() => setIsCTAButtonActive((prev) => !prev)}
        >
          <div className="relative top-[3px] tracking-[0.2rem]">Contact Me</div>
        </button>
      </div>
      <div className={`min-h-screen flex flex-col items-center px-8`}>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video mb-20 shadow-md"></div>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video mb-20 shadow-md"></div>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video mb-20 shadow-md"></div>
      </div>
    </main>
  );
}

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null!);
  const [clientX, setClientX] = useState(1);
  const [clientY, setClientY] = useState(1);
  useFrame((_state, delta) => {
    meshRef.current.rotation.y += (delta / 8) * clientX;
    meshRef.current.rotation.x += (delta / 8) * clientY;
  });
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={3}
      onClick={() => {
        setClientX(1);
        setClientY(1);
      }}
      onPointerOver={(event) => {
        setClientX((prevClientX) => (prevClientX - event.clientX) / 500);
        setClientY((prevClientY) => (prevClientY - event.clientY) / 500);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial wireframe={true} />
    </mesh>
  );
}
