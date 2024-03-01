"use client";

import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import ReactPlayer from "react-player/lazy";
import { throttle } from "@/lib";
import { FPS_30 } from "@/data";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster, resolveValue } from "react-hot-toast";

type ContactMessage = {
  email: string;
  message: string;
};

type ContactSendButtonText = "Send" | "Sending";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [isCTAButtonActive, setIsCTAButtonActive] = useState(false);
  const [contactSendButtonText, setContactSendButtonText] =
    useState<ContactSendButtonText>("Send");

  const cursorHaloRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLImageElement>(null);
  const aboutBlockRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactMessage>();

  const onSubmitMessage: SubmitHandler<ContactMessage> = async (data) => {
    try {
      setContactSendButtonText("Sending");
      console.log(data);
      const response = await fetch("/api/email/send", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const hasError = !response.ok || Boolean((await response.json()).error);

      if (hasError) {
        toast.error("The message was not sent!\nPlease try again later.");
        setContactSendButtonText("Send");
        return;
      }

      reset();
      setContactSendButtonText("Send");
      toast.success(
        "Message sent!\nA confirmation will be sent to your email."
      );
    } catch (error) {
      toast.error("The message was not sent!\nMake sure you are online.");
      setContactSendButtonText("Send");
    }
  };

  const onSubmitMessageError = () => {
    toast.error("Please check the form for errors.");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCTAButtonActive(true);
    }, 1000);
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

    if (!window.matchMedia("(any-hover: none)").matches) {
      window.addEventListener("mousemove", moveCursorHalo);
    }
    return () => window.removeEventListener("mousemove", moveCursorHalo);
  }, []);

  useEffect(() => {
    const initializeSevicesSection = throttle(() => {
      const imageBottom = aboutImageRef.current?.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (typeof imageBottom !== undefined && imageBottom! - windowHeight < 0) {
        window.removeEventListener("scroll", initializeSevicesSection);
        aboutImageRef.current?.classList.add("fade-out-image");
        aboutBlockRef.current?.classList.remove("slide-up-block-hide");
        aboutBlockRef.current?.classList.add("slide-up-block-animate");
      }
    }, FPS_30);

    const imageBottom = aboutImageRef.current?.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (typeof imageBottom !== undefined && imageBottom! - windowHeight < 0) {
      initializeSevicesSection();
    } else {
      window.addEventListener("scroll", initializeSevicesSection);
    }
    return () => window.removeEventListener("scroll", initializeSevicesSection);
  }, []);

  return (
    <main className="">
      <nav
        className={`${bebasNeue.className} tracking-[0.2rem] flex justify-between items-center fixed top-0 left-0 right-0 h-20 px-8 backdrop-blur-md z-10`}
      >
        <a href="#home" className={`text-2xl`}>
          KakkoiDev
        </a>
        <div className="flex items-center">
          <div className="hidden gap-2 mr-4 sm:flex">
            <a href="#portfolio">Portfolio</a>|<a href="#about">About</a>
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
        className="fixed origin-center rounded-full pointer-events-none cursor-halo"
      />
      <div
        id="home"
        className={`${bebasNeue.className} bg-dotted h-screen flex flex-col justify-center items-center px-8 text-center`}
      >
        <Canvas className="!absolute">
          <Box position={[0, 0, 0]} />
        </Canvas>
        <div className="text-5xl sm:text-6xl mb-14 traking-[0.2rem]">
          KakkoiDev Studio
        </div>
        <div className="text-7xl sm:text-8xl">Web & App</div>
        <div className="text-6xl sm:text-7xl tracking-[0.4rem]">
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
        className={`min-h-screen flex flex-col items-center py-40 gap-10 sm:gap-20 bg-white`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem]`}
        >
          Portfolio
        </div>

        {[1, 2, 3].map((value) => (
          <div
            key={value}
            className="bg-gray-300 max-w-[640px] w-full sm:rounded-3xl aspect-video shadow-md overflow-hidden relative"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 px-8 py-8 overflow-auto text-justify transition bg-white sm:px-12 sm:py-12 opacity-80 sm:opacity-0 hover:opacity-80">
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
                <div className="flex flex-wrap justify-center gap-4">
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
                <ul className="pl-4 list-disc">
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
        ))}
      </div>
      <div
        id="about"
        className={`min-h-screen flex flex-col items-center px-8 py-40 bg-gray-50 text-justify`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem] mb-12`}
        >
          About
        </div>
        <div className="relative w-full max-w-xl">
          <Image
            ref={aboutImageRef}
            className="mx-auto rounded-full"
            src="/cyril.jpg"
            width="350"
            height="350"
            alt="Picture of Cyril"
          />
          <div
            ref={aboutBlockRef}
            className="flex flex-col gap-8 slide-up-block slide-up-block-hide"
          >
            <div className="text-5xl text-center">{`Welcome, I'm Cyril`}</div>
            <div className="text-2xl">
              A frontend web developer with over 5 years of experience,
              specialized in NextJS, Typescript, and React Native.
            </div>
            {/* <div className="flex gap-8 mx-auto">
              <div className="size-12 icon-[logos--nextjs-icon]" />
              <div className="size-12 icon-[logos--typescript-icon]" />
              <div className="size-12 icon-[logos--react]" />
            </div> */}
            <div className="flex flex-col gap-2 text-xl">
              <div className="mb-2 text-4xl">What I do</div>
              <div>
                <span className="icon-[mdi--application-brackets-outline] size-6 mr-2 top-1 relative" />
                Build high-quality, scalable, and user-fiendly websites and
                mobile applications.
              </div>
              <div>
                <span className="icon-[mdi--bug-outline] size-6 mr-2 top-1 relative" />
                Debug and maintain existing apps.
              </div>
              <div>
                <span className="icon-[mdi--account-tie] size-6 mr-2 top-1 relative" />
                Lead and mentor teams.
              </div>
            </div>
            {/* <div className="flex flex-col gap-2 text-xl text-justify sm:text-center">
              <div>
                Expertise in building high-quality, scalable, and user-friendly
                web applications.
              </div>
              <div>
                Passionate about using cutting-edge technologies to create
                engaging user experiences.
              </div>
            </div> */}
            {/* <div className="flex flex-wrap justify-between gap-2">
              <div className="size-8 icon-[logos--expo-icon]" />
              <div className="size-8 icon-[logos--react]" />
              <div className="size-8 icon-[logos--javascript]" />
              <div className="size-8 icon-[logos--html-5]" />
              <div className="size-8 icon-[logos--css-3]" />
              <div className="size-8 icon-[logos--nodejs-icon-alt]" />
              <div className="size-8 icon-[logos--nestjs]" />
              <div className="size-8 icon-[logos--vue]" />
              <div className="size-8 icon-[logos--supabase-icon]" />
              <div className="size-8 icon-[logos--tailwindcss-icon]" />
              <div className="size-8 icon-[logos--playwright]" />
              <div className="size-8 icon-[logos--jest]" />
              <div className="size-8 icon-[logos--graphql]" />
              <div className="size-8 icon-[logos--redux]" />
              <div className="size-8 icon-[logos--electron]" />
            </div> */}
          </div>
        </div>
      </div>
      <div
        id="contact"
        className={`bg-dotted min-h-screen flex flex-col items-center px-8 py-40`}
      >
        <div
          className={`${bebasNeue.className} text-6xl sm:text-7xl tracking-[0.4rem] mb-12`}
        >
          Contact Me
        </div>
        <div className="flex gap-8 mb-10">
          <a href="#" className="size-12 icon-[logos--linkedin-icon]" />
          <a href="#" className="size-12 icon-[logos--github-icon]" />
          <a href="#" className="size-12 icon-[logos--youtube-icon]" />
        </div>
        <form
          ref={contactFormRef}
          onSubmit={handleSubmit(onSubmitMessage, onSubmitMessageError)}
          className="flex flex-col w-full max-w-xl"
          noValidate={true}
        >
          <input
            type="email"
            className={`${
              errors.email ? "outline outline-red-500" : ""
            } w-full px-8 py-4 mb-8 text-lg shadow-md`}
            placeholder="Enter your email..."
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <div className="relative text-red-500 -top-7 -mb-[24px]">
              {errors.email.message}
            </div>
          )}
          <textarea
            placeholder="Enter your message..."
            cols={30}
            rows={10}
            className={`${
              errors.message ? "outline outline-red-500" : ""
            } w-full px-8 py-4 mb-8 text-lg shadow-md`}
            {...register("message", {
              required: "Message required",
            })}
          ></textarea>
          {errors.message && (
            <div className="relative text-red-500 -top-7 -mb-[24px]">
              {errors.message.message}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                bebasNeue.className
              } inline-block cursor-pointer text-4xl border-4 border-black px-4 py-2 active:top-[2px] relative cta ${
                isCTAButtonActive ? "active" : ""
              }`}
              onClick={() => {
                setIsCTAButtonActive((prev) => !prev);
              }}
              disabled={contactSendButtonText === "Sending"}
            >
              <div className="relative top-[3px] tracking-[0.2rem]">
                {contactSendButtonText}
              </div>
            </button>
          </div>
        </form>
      </div>
      <footer
        className={`flex flex-col items-center px-8 py-40 gap-6 bg-white z-20 relative`}
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
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      >
        {(t) => {
          const messageList =
            typeof resolveValue(t.message, t) === "string"
              ? (resolveValue(t.message, t) as string).split("\n")
              : [];
          const message = messageList.map((text) => (
            <div key={text}>{text}</div>
          ));

          return (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } justify-between items-center max-w-sm w-full bg-white shadow-md rounded-md flex px-8 py-4 ${
                t.type === "error" ? "text-red-500" : ""
              } ${t.type === "success" ? "text-green-500" : ""}`}
            >
              {/* <div dangerouslySetInnerHTML={{ __html: message }}></div> */}
              <div className="flex flex-col">{message}</div>
              <div
                onClick={() => toast.dismiss(t.id)}
                className="size-6 icon-[mdi--close] cursor-pointer"
              />
            </div>
          );
        }}
      </Toaster>
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
