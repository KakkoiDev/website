import { Icon as IconType, Size } from "@/type";

const getIcon = (icon: IconType): { class: string; title: string } => {
  switch (icon) {
    case "android":
      return {
        title: "Android",
        class: "icon-[logos--android-icon]",
      };
    case "expo":
      return {
        title: "Expo",
        class: "icon-[logos--expo-icon]",
      };
    case "git":
      return {
        title: "Git",
        class: "icon-[logos--git-icon]",
      };
    case "github":
      return {
        title: "GitHub",
        class: "icon-[fa6-brands--github] text-[#000000]",
      };
    case "ios":
      return {
        title: "iOS",
        class: "icon-[logos--ios]",
      };
    case "apple":
      return {
        title: "Apple",
        class: "icon-[logos--apple]",
      };
    case "javascript":
      return {
        title: "JavaScript",
        class: "icon-[logos--javascript]",
      };
    case "linkedin":
      return {
        title: "LinkedIn",
        class: "icon-[fa6-brands--linkedin] text-[#0b66c2]",
      };
    case "linux":
      return {
        title: "Linux",
        class: "icon-[logos--linux-tux]",
      };
    case "nextjs":
      return {
        title: "NextJS",
        class: "icon-[logos--nextjs-icon]",
      };
    case "react":
      return {
        title: "React",
        class: "icon-[logos--react]",
      };
    case "react native":
      return {
        title: "React Native",
        class: "icon-[logos--react]",
      };
    case "typescript":
      return {
        title: "TypeScript",
        class: "icon-[logos--typescript-icon]",
      };
    case "upwork":
      return {
        title: "UpWork",
        class: "icon-[fa6-brands--upwork] text-[#14A800]",
      };
    case "windows":
      return {
        title: "Windows",
        class: "icon-[logos--microsoft-windows-icon]",
      };
    case "supabase":
      return {
        title: "SupaBase",
        class: "icon-[logos--supabase-icon]",
      };
    case "tailwind":
      return {
        title: "TailWind",
        class: "icon-[logos--tailwindcss-icon]",
      };
    case "css":
      return {
        title: "CSS",
        class: "icon-[logos--css-3]",
      };
    case "html":
      return {
        title: "HTML",
        class: "icon-[logos--html-5]",
      };
    case "jest":
      return {
        title: "Jest",
        class: "icon-[logos--jest]",
      };
    case "apple app store":
      return {
        title: "App Store",
        class: "icon-[logos--apple-app-store]",
      };
    case "google play":
      return {
        title: "Google Play",
        class: "icon-[logos--google-play-icon]",
      };
    case "nodejs":
      return {
        title: "NodeJS",
        class: "icon-[logos--nodejs-icon-alt]",
      };
    case "redux":
      return {
        title: "Redux",
        class: "icon-[logos--redux]",
      };
    case "aws ses":
      return {
        title: "AWS SES",
        class: "icon-[logos--aws-ses]",
      };
    case "playwright":
      return {
        title: "PlayWright",
        class: "icon-[logos--playwright]",
      };
    case "electron":
      return {
        title: "Electron",
        class: "icon-[logos--electron]",
      };
    case "terminal":
      return {
        title: "Terminal",
        class: "icon-[logos--terminal]",
      };
    case "graphql":
      return {
        title: "GraphQL",
        class: "icon-[logos--graphql]",
      };
    case "nuxt":
      return {
        title: "NuxtJS",
        class: "icon-[logos--nuxt-icon]",
      };
    case "vue":
      return {
        title: "VueJS",
        class: "icon-[logos--vue]",
      };
    case "calendly":
      return {
        title: "Calendly",
        class: "icon-[simple-icons--calendly] text-[#016bff]",
      };
    case "youtube":
      return {
        title: "YouTube",
        class: "icon-[fa6-brands--youtube] text-[#ff0000]",
      };
    default:
      return {
        title: "NextJS",
        class: "icon-[logos--nextjs-icon]",
      };
  }
};
export const Icon = ({
  name,
  size = "medium",
  link,
}: {
  name: IconType;
  size?: Size;
  link?: string;
}) => {
  const icon = getIcon(name);
  if (link) {
    return (
      <a
        title={icon.title}
        aria-label={icon.title}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${size === "small" ? "size-6" : ""} ${
          size === "medium" ? "size-8" : ""
        }  ${size === "large" ? "size-12" : ""} ${icon.class}`}
      />
    );
  }

  return (
    <div
      title={icon.title}
      role="img"
      aria-label={icon.title}
      className={`${size === "small" ? "size-6" : ""} ${
        size === "medium" ? "size-8" : ""
      }  ${size === "large" ? "size-12" : ""} ${icon.class}`}
    />
  );
};
