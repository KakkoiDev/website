import Home from "@/components/Home";

// Static, but rebuilt daily so the footer year rolls over on its own.
export const revalidate = 86400;

export default function Page() {
  return <Home locale="en" />;
}
