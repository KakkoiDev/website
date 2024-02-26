"use client";
import Image from "next/image";
import { Inter, Bebas_Neue } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import ReactPlayer from "react-player/lazy";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [isCTAButtonActive, setIsCTAButtonActive] = useState(false);
  const [isCTAButtonInitializing, setIsCTAButtonInitializing] = useState(false);

  const cursorHaloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsCTAButtonInitializing(true);

      setTimeout(() => {
        setIsCTAButtonActive(true);
        setIsCTAButtonInitializing(false);
      }, 500);
    }, 500);
  }, []);

  useEffect(() => {
    let idleMouseShowHaloTimeout: ReturnType<typeof setTimeout> | null = null;
    let idleMouseHideHaloTimeout: ReturnType<typeof setTimeout> | null = null;

    const moveCursorHalo = (event: MouseEvent) => {
      if (!cursorHaloRef.current) return;
      const cursorHaloHeiht = cursorHaloRef.current.clientHeight;
      const yPosition = event.clientY - cursorHaloHeiht / 2;
      const xPosition = event.clientX - cursorHaloHeiht / 2;

      cursorHaloRef.current.style.top = String(yPosition) + "px";
      cursorHaloRef.current.style.left = String(xPosition) + "px";

      cursorHaloRef.current.classList.remove("halo-md");
      if (idleMouseShowHaloTimeout) clearTimeout(idleMouseShowHaloTimeout);
      if (idleMouseHideHaloTimeout) clearTimeout(idleMouseHideHaloTimeout);

      idleMouseShowHaloTimeout = setTimeout(() => {
        cursorHaloRef.current?.classList.add("halo-md");
      }, 500);

      idleMouseHideHaloTimeout = setTimeout(() => {
        cursorHaloRef.current?.classList.remove("halo-md");
      }, 2500);
    };

    window.addEventListener("mousemove", moveCursorHalo);
    return () => window.removeEventListener("mousemove", moveCursorHalo);
  }, []);

  return (
    <main className="">
      <nav
        className={`${bebasNeue.className} tracking-[0.2rem] flex justify-between items-center fixed top-0 left-0 right-0 h-20 px-8 backdrop-blur-md z-20`}
      >
        <a href="#home" className={`text-2xl`}>
          KakkoiDev
        </a>
        <div className="flex items-center">
          <div className="hidden sm:flex mr-4 gap-2">
            <a href="#portfolio">Portfolio</a>|<a href="#services">Services</a>
          </div>
          <a
            href="#contact"
            className={`cursor-pointer border-2 border-black px-2 cta
         ${isCTAButtonActive ? "active" : ""}
         `}
            onClick={() =>
              setIsCTAButtonActive((prevIsActive) => !prevIsActive)
            }
          >
            <div className="relative top-[2px] tracking-widest">Contact Me</div>
          </a>
        </div>
      </nav>
      <div
        ref={cursorHaloRef}
        className="cursor-halo rounded-full fixed origin-center pointer-events-none"
      />
      <div
        id="home"
        className={`${bebasNeue.className} bg-dotted h-screen flex flex-col justify-center items-center px-8 text-center`}
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
        <a
          href="#contact"
          className={`cursor-pointer mt-14 text-4xl border-4 border-black px-4 py-2 active:top-[2px] relative cta ${
            isCTAButtonActive ? "active" : ""
          }`}
          onClick={() => setIsCTAButtonActive((prev) => !prev)}
        >
          <div className="relative top-[3px] tracking-[0.2rem]">Contact Me</div>
        </a>
      </div>
      <div
        id="portfolio"
        className={`min-h-screen flex flex-col items-center px-8 py-40 gap-20 bg-white`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem]`}
        >
          Portfolio
        </div>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video shadow-md overflow-hidden relative">
          <div className="text-justify overflow-auto px-8 py-8 sm:px-12 sm:py-12 bg-white opacity-80 sm:opacity-0 hover:opacity-80 transition absolute top-0 left-0 bottom-0 right-0">
            <div className={`${bebasNeue.className} text-4xl sm:text-5xl`}>
              Project 1
            </div>
            <a
              href="#"
              className="flex items-center mb-4 text-blue-500 hover:underline"
            >
              <div className="size-6 icon-[mdi--external-link] mr-2 shrink-0" />
              <div className="overflow-hidden text-ellipsis">
                https://project1.com/dashboard
              </div>
            </a>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-center">
                <div className="size-8 icon-[logos--linkedin-icon]" />
                <div className="size-8 icon-[logos--github-icon]" />
                <div className="size-8 icon-[logos--youtube-icon]" />
                <div className="size-8 icon-[logos--nextjs-icon]" />
                <div className="size-8 icon-[logos--typescript-icon]" />
                <div className="size-8 icon-[logos--expo-icon]" />
                <div className="size-8 icon-[logos--react]" />
                <div className="size-8 icon-[logos--javascript]" />
                <div className="size-8 icon-[logos--git-icon]" />
                <div className="size-8 icon-[logos--linux-tux]" />
                <div className="size-8 icon-[logos--microsoft-windows-icon]" />
                <div className="size-8 icon-[logos--apple]" />
                <div className="size-8 icon-[logos--android-icon]" />
                <div className="size-8 icon-[logos--ios]" />
              </div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid eius, officia incidunt veritatis, ducimus qui aut
                debitis nobis, non obcaecati in nesciunt saepe mollitia minima
                ratione inventore animi libero eligendi!
              </div>
              <ul className="list-disc pl-4">
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
                <li>Task 4</li>
              </ul>
            </div>
          </div>
          <div className="pointer-events-none">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=6rd6NCoDKDc"
              playing={true}
              muted={true}
              loop={true}
              controls={false}
            />
          </div>
        </div>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video shadow-md"></div>
        <div className="bg-gray-300 max-w-[640px] w-full rounded-3xl aspect-video shadow-md"></div>
      </div>
      <div
        id="services"
        className={`min-h-screen flex flex-col items-center px-8 py-40 gap-20 bg-gray-50`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem]`}
        >
          Services
        </div>
      </div>
      <div
        id="contact"
        className={`bg-dotted min-h-screen flex flex-col items-center px-8 py-40`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem] mb-8`}
        >
          Contact Me
        </div>
        <div className="flex gap-8">
          <a href="#" className="size-12 icon-[logos--linkedin-icon]" />
          <a href="#" className="size-12 icon-[logos--github-icon]" />
          <a href="#" className="size-12 icon-[logos--youtube-icon]" />
        </div>
      </div>
      <footer
        className={`flex flex-col items-center px-8 py-40 gap-6 bg-white z-30 relative`}
      >
        <div className="flex gap-6">
          <a href="#" className="size-8 icon-[logos--linkedin-icon]" />
          <a href="#" className="size-8 icon-[logos--github-icon]" />
          <a href="#" className="size-8 icon-[logos--youtube-icon]" />
        </div>
        <div className={`${bebasNeue.className} tracking-[0.2rem]`}>
          KakkoiDev &copy; {new Date().getFullYear()}
        </div>
      </footer>
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
