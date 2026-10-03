"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import ReactPlayer from "react-player/lazy";
import { throttle } from "@/lib";
import {
  FPS_30,
  dictionary,
  experience,
  portfolioProjects,
  projects,
} from "@/data";
import { CAREER_START_YEAR } from "@/data/dictionary";
import { bebasNeue, notoSansJP } from "@/lib/fonts";
import { Locale } from "@/type";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster, resolveValue } from "react-hot-toast";
import { Icon } from "@/ui";
import { socialLinks } from "@/data/social-links";

type ContactMessage = {
  email: string;
  message: string;
  website: string; // honeypot, hidden from people
};

const noopSubscribe = () => () => {};

export default function Home({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  // Bebas Neue has no Japanese glyphs, so Japanese headings use the body font.
  const headingFont =
    locale === "ja" ? `${notoSansJP.className} font-bold` : bebasNeue.className;
  const formatPeriod = (period: string) => {
    const [year, month] = period.split("-").map(Number);
    return t.formatMonth(year, month);
  };

  const [isCTAButtonActive, setIsCTAButtonActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    new Array(portfolioProjects.length).fill(false)
  );
  // false on the server and during hydration, the real value after it
  const hasMouse = useSyncExternalStore(
    noopSubscribe,
    () => !window.matchMedia("(any-hover: none)").matches,
    () => false
  );
  const hasWindow = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  ); // react-player must not render on the server
  const [isVideoReady, setIsVideoReady] = useState(false); // wait for video to load to avoid flicker with portfolio overlay
  const [isAboutSectionVideoPlaying, setIsAboutSectionVideoPlaying] =
    useState(false);

  const cursorHaloRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLImageElement>(null);
  const aboutBlockRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const portfolioElementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactMessage>();

  const onSubmitMessage: SubmitHandler<ContactMessage> = async (data) => {
    try {
      setIsSending(true);
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error(t.contact.failed);
        return;
      }

      reset();
      toast.success(t.contact.sent);
    } catch {
      toast.error(t.contact.offline);
    } finally {
      setIsSending(false);
    }
  };

  const onSubmitMessageError = () => {
    toast.error(t.contact.formErrors);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCTAButtonActive(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;

    let idleMouseShowHaloTimeout: ReturnType<typeof setTimeout> | null = null;
    let idleMouseHideHaloTimeout: ReturnType<typeof setTimeout> | null = null;

    const moveCursorHalo = (event: MouseEvent) => {
      if (!cursorHaloRef.current) return;
      const cursorHaloHeight = cursorHaloRef.current.clientHeight;
      const yPosition = event.clientY - cursorHaloHeight / 2;
      const xPosition = event.clientX - cursorHaloHeight / 2;

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
  }, [hasMouse]);

  useEffect(() => {
    const initializeAboutSection = throttle(() => {
      const imageBottom = aboutImageRef.current?.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (imageBottom !== undefined && imageBottom - windowHeight < 0) {
        window.removeEventListener("scroll", initializeAboutSection);
        aboutImageRef.current?.classList.add("fade-out-image");
        aboutBlockRef.current?.classList.remove("slide-up-block-hide");
        aboutBlockRef.current?.classList.add("slide-up-block-animate");
      }
    }, FPS_30);

    const imageBottom = aboutImageRef.current?.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (imageBottom !== undefined && imageBottom - windowHeight < 0) {
      initializeAboutSection();
    } else {
      window.addEventListener("scroll", initializeAboutSection);
    }
    return () => window.removeEventListener("scroll", initializeAboutSection);
  }, []);

  // react-player scroll event listener
  useEffect(() => {
    const handlePlayerState = throttle(() => {
      // if show more startPercentage of thumbnail, start video
      // if show more stopPercentage of thumbnail, pause video
      // only start last video, stop the previous ones
      const startPercentage = hasMouse ? 60 : 30;
      const stopPercentage = hasMouse ? 200 : 120;
      const allPotentiallyPlayingVideos = new Array(
        portfolioProjects.length
      ).fill(false);

      portfolioElementRefs.current.forEach((element, index) => {
        const elementBoundingClientRect = element?.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementShowingHeight =
          windowHeight - (elementBoundingClientRect?.top ?? 0);
        const elementShowingPercentage =
          (elementShowingHeight / (elementBoundingClientRect?.height ?? 1)) *
          100;

        if (
          elementShowingPercentage > startPercentage &&
          elementShowingPercentage < stopPercentage
        ) {
          allPotentiallyPlayingVideos.splice(index, 1, true);
        }
      });

      const lastPlayingVideoIndex =
        allPotentiallyPlayingVideos.lastIndexOf(true);
      const currentlyPlayingVideo = new Array(portfolioProjects.length).fill(
        false
      );

      if (lastPlayingVideoIndex !== -1) {
        currentlyPlayingVideo.splice(lastPlayingVideoIndex, 1, true);
      }

      setIsPlaying(currentlyPlayingVideo);
    }, FPS_30);

    window.addEventListener("scroll", handlePlayerState);
    return () => window.removeEventListener("scroll", handlePlayerState);
  }, [isPlaying, hasMouse]);

  return (
    <main className="">
      <nav
        className={`${headingFont} tracking-[0.2rem] flex justify-between items-center gap-4 fixed top-0 left-0 right-0 h-20 px-8 backdrop-blur-md z-10`}
      >
        <a href="#home" className={`text-2xl`}>
          KakkoiDev
        </a>
        <div className="flex items-center">
          <div className="hidden gap-2 mr-4 md:flex">
            <a href="#about">{t.nav.about}</a>|
            <a href="#experience">{t.nav.experience}</a>|
            <a href="#portfolio">{t.nav.portfolio}</a>|
            <a href="#projects">{t.nav.projects}</a>
          </div>
          <a
            href={t.nav.otherLocale.href}
            hrefLang={t.nav.otherLocale.lang}
            lang={t.nav.otherLocale.lang}
            className="mr-4 underline-offset-4 hover:underline"
          >
            {t.nav.otherLocale.label}
          </a>
          <a
            href="#contact"
            className={`cursor-pointer border-2 border-black px-2 cta
         ${isCTAButtonActive ? "active" : ""}
         `}
            onClick={() =>
              setIsCTAButtonActive((prevIsActive) => !prevIsActive)
            }
          >
            <div className="relative top-[2px] tracking-widest whitespace-nowrap">
              {t.nav.contact}
            </div>
          </a>
        </div>
      </nav>
      <div
        ref={cursorHaloRef}
        className="fixed origin-center rounded-full pointer-events-none cursor-halo"
      />
      <div
        id="home"
        className={`${headingFont} bg-dotted h-screen flex flex-col justify-center items-center px-8 text-center`}
      >
        <Canvas className="!absolute">
          <Box position={[0, 0, 0]} />
        </Canvas>
        <h1 className="text-5xl sm:text-6xl mb-14 tracking-[0.2rem]">
          {t.hero.studio}
        </h1>
        <div
          className={`${
            locale === "ja" ? "text-5xl" : "text-7xl"
          } sm:text-8xl`}
        >
          {t.hero.line1}
        </div>
        <div className="text-6xl sm:text-7xl tracking-[0.4rem]">
          {t.hero.line2}
        </div>
        <a
          href="#contact"
          className={`cursor-pointer mt-14 text-4xl border-4 border-black px-4 py-2 active:top-[2px] relative cta ${
            isCTAButtonActive ? "active" : ""
          }`}
          onClick={() => setIsCTAButtonActive((prev) => !prev)}
        >
          <div className="relative top-[3px] tracking-[0.2rem]">
            {t.nav.contact}
          </div>
        </a>
      </div>

      <div
        id="about"
        className={`min-h-screen flex flex-col items-center px-8 py-40 bg-white text-justify`}
      >
        <h2
          className={`${headingFont} text-6xl sm:text-7xl tracking-[0.4rem] mb-12`}
        >
          {t.about.title}
        </h2>
        <div className="relative w-full max-w-xl">
          <Image
            ref={aboutImageRef}
            className="mx-auto rounded-full"
            src="/cyril.jpg"
            width="350"
            height="350"
            alt={t.about.photoAlt}
          />
          <div
            ref={aboutBlockRef}
            className="flex flex-col gap-8 slide-up-block slide-up-block-hide"
          >
            <div className="text-5xl text-center">{t.about.welcome}</div>
            <div className="text-2xl">
              {t.about.intro(new Date().getFullYear() - CAREER_START_YEAR)}
            </div>
            <div className="text-xl">{t.about.languages}</div>
            <div className="flex flex-col gap-2 text-xl">
              <div className="mb-2 text-4xl">{t.about.achievementsTitle}</div>
              {t.about.achievements.map(({ icon, text }) => (
                <div key={text} className="flex">
                  <div
                    className={`shrink-0 ${icon} size-6 mr-2 top-[2px] relative`}
                  />
                  {text}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-xl">
              <div className="mb-2 text-4xl">{t.about.whatIDoTitle}</div>
              {t.about.whatIDo.map(({ icon, text }) => (
                <div key={text} className="flex">
                  <div
                    className={`shrink-0 ${icon} size-6 mr-2 top-[2px] relative`}
                  />
                  {text}
                </div>
              ))}
            </div>
            <div className="bg-gray-300 w-full aspect-video relative">
              {hasWindow && (
                <ReactPlayer
                  url="https://cdn.kakkoi.dev/how-to-make-a-website.mp4"
                  controls={true}
                  width="100%"
                  height="100%"
                  playing={isAboutSectionVideoPlaying}
                />
              )}
              {!isAboutSectionVideoPlaying && (
                <>
                  <Image
                    src="https://cdn.kakkoi.dev/how-to-make-a-website-thumbnail.png"
                    alt={t.about.videoAlt}
                    width={869}
                    height={484}
                    className="absolute top-0 cursor-pointer"
                    onClick={() => setIsAboutSectionVideoPlaying(true)}
                  />
                  <button
                    type="button"
                    aria-label={t.about.playVideo}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-20 rounded-full cursor-pointer"
                    onClick={() => setIsAboutSectionVideoPlaying(true)}
                  >
                    <div className="icon-[mdi--play-circle] size-20 text-black " />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="experience"
        className="flex flex-col items-center px-8 py-40 gap-12 bg-white"
      >
        <h2
          className={`${headingFont} text-6xl sm:text-7xl tracking-[0.4rem] text-center`}
        >
          {t.experience.title}
        </h2>
        <ol className="flex flex-col w-full max-w-3xl gap-10">
          {experience.map((job) => (
            <li
              key={job.start}
              className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <div className="text-gray-600">
                <span className="whitespace-nowrap">
                  {formatPeriod(job.start)} –
                </span>{" "}
                <span className="whitespace-nowrap">
                  {job.end ? formatPeriod(job.end) : t.experience.present}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold">
                  {job.role[locale]}
                  <span className="font-normal">
                    {" "}
                    · {t.experience.place(job.company[locale], job.location[locale])}
                  </span>
                </h3>
                <ul className="flex flex-col gap-1 pl-4 text-lg list-disc">
                  {job.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div
        id="portfolio"
        className={`min-h-screen flex flex-col items-center py-40 gap-20 bg-gray-50`}
      >
        <h2
          className={`${headingFont} text-6xl sm:text-7xl tracking-[0.4rem]`}
        >
          {t.portfolio.title}
        </h2>
        {portfolioProjects.map((portfolio, index) => (
          <div
            ref={(element) => {
              portfolioElementRefs.current[index] = element;
            }}
            key={index}
            className="bg-gray-300 max-w-[860px] text-lg w-full sm:aspect-video shadow-md overflow-hidden relative"
          >
            <div className="pointer-events-none relative aspect-video">
              <Image
                src={portfolio.fallbackImage}
                alt={portfolio.title}
                width={869}
                height={484}
                className="absolute"
              />
              {hasWindow && (
                <ReactPlayer
                  className="relative z-[1]"
                  url={portfolio.video}
                  playing={isPlaying[index]}
                  muted={true}
                  loop={true}
                  controls={false}
                  width="100%"
                  height="100%"
                  onReady={() => setIsVideoReady(true)}
                />
              )}
            </div>
            <div
              className={`${
                isVideoReady && hasMouse ? "z-[2] absolute" : ""
              } top-0 bottom-0 left-0 right-0 px-8 py-8 overflow-auto text-justify transition bg-white sm:px-12 sm:py-12 ${
                hasMouse ? "opacity-0 hover:opacity-90" : ""
              }`}
            >
              <div
                className={`${headingFont} text-4xl sm:text-5xl mb-2`}
              >
                {portfolio.title}
              </div>
              <div className="mb-6">
                {portfolio.link.map((link) => {
                  const title =
                    typeof link === "object" && "title" in link
                      ? link.title
                      : link;
                  const href =
                    typeof link === "object" && "href" in link
                      ? link.href
                      : link;
                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center mb-0 text-blue-500 hover:underline"
                    >
                      <div className="size-6 icon-[mdi--external-link] mr-2 shrink-0" />
                      <div className="overflow-hidden text-ellipsis">
                        {title}
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap justify-center gap-4">
                  {portfolio.technologies.map((technology) => (
                    <Icon key={technology} name={technology} />
                  ))}
                </div>
                <div>{portfolio.description[locale]}</div>
                <ul className="pl-4 list-disc">
                  {portfolio.achievements[locale].map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        id="projects"
        className="flex flex-col items-center px-8 py-40 gap-12 bg-white"
      >
        <h2
          className={`${headingFont} text-6xl sm:text-7xl tracking-[0.4rem] text-center`}
        >
          {t.projects.title}
        </h2>
        <p className="max-w-xl text-xl text-center">{t.projects.intro}</p>
        <ul className="grid w-full max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.title}
              className="flex flex-col gap-4 p-8 shadow-md bg-gray-50"
            >
              <h3 className={`${headingFont} text-4xl`}>
                {project.title}
              </h3>
              <p className="grow">{project.description[locale]}</p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {project.tags.map((tag) => (
                  <li key={tag} className="px-2 py-1 bg-white border">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <div className="size-6 icon-[mdi--external-link] mr-2 shrink-0" />
                    {t.projects.visit}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <div className="size-6 icon-[fa6-brands--github] mr-2 shrink-0" />
                    {t.projects.source}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        id="contact"
        className={`bg-dotted min-h-screen flex flex-col items-center px-8 py-40`}
      >
        <h2
          className={`${headingFont} text-6xl sm:text-7xl tracking-[0.4rem] mb-12`}
        >
          {t.contact.title}
        </h2>
        <div className="flex gap-8 mb-10">
          {socialLinks.map((socialLink) => (
            <Icon
              key={socialLink.link}
              name={socialLink.name}
              link={socialLink.link}
              size="large"
            />
          ))}
        </div>
        <form
          ref={contactFormRef}
          onSubmit={handleSubmit(onSubmitMessage, onSubmitMessageError)}
          className="flex flex-col w-full max-w-xl"
          noValidate={true}
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[10000px] size-px overflow-hidden"
            {...register("website")}
          />
          <input
            type="email"
            aria-label={t.contact.emailLabel}
            autoComplete="email"
            maxLength={254}
            className={`${
              errors.email ? "outline outline-red-500" : ""
            } w-full px-8 py-4 mb-8 text-lg shadow-md`}
            placeholder={t.contact.emailPlaceholder}
            {...register("email", {
              required: t.contact.emailRequired,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t.contact.emailInvalid,
              },
            })}
          />
          {errors.email && (
            <div className="relative text-red-500 -top-7 -mb-[24px]">
              {errors.email.message}
            </div>
          )}
          <textarea
            aria-label={t.contact.messageLabel}
            maxLength={5000}
            placeholder={t.contact.messagePlaceholder}
            cols={30}
            rows={10}
            className={`${
              errors.message ? "outline outline-red-500" : ""
            } w-full px-8 py-4 mb-8 text-lg shadow-md`}
            {...register("message", {
              required: t.contact.messageRequired,
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
              className={`${headingFont} inline-block cursor-pointer text-4xl border-4 border-black px-4 py-2 active:top-[2px] relative cta ${
                isCTAButtonActive ? "active" : ""
              }`}
              onClick={() => {
                setIsCTAButtonActive((prev) => !prev);
              }}
              disabled={isSending}
            >
              <div className="relative top-[3px] tracking-[0.2rem]">
                {isSending ? t.contact.sending : t.contact.send}
              </div>
            </button>
          </div>
        </form>
      </div>
      <footer
        className={`flex flex-col items-center px-8 py-40 gap-6 bg-white z-20 relative`}
      >
        <div className="flex gap-6">
          {socialLinks.map((socialLink) => (
            <Icon
              key={socialLink.link}
              name={socialLink.name}
              link={socialLink.link}
            />
          ))}
        </div>
        <div className={`${headingFont} tracking-[0.2rem]`}>
          KakkoiDev &copy; {new Date().getFullYear()}
        </div>
      </footer>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      >
        {(currentToast) => {
          const resolved = resolveValue(currentToast.message, currentToast);
          const messageList =
            typeof resolved === "string" ? resolved.split("\n") : [];
          const message = messageList.map((text) => (
            <div key={text}>{text}</div>
          ));

          return (
            <div
              className={`${
                currentToast.visible ? "animate-enter" : "animate-leave"
              } justify-between items-center max-w-sm w-full bg-white shadow-md flex px-8 py-4 ${
                currentToast.type === "error" ? "text-red-500" : ""
              } ${currentToast.type === "success" ? "text-green-500" : ""}`}
            >
              <div className="flex flex-col">{message}</div>
              <button
                type="button"
                aria-label={t.contact.dismiss}
                onClick={() => toast.dismiss(currentToast.id)}
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
