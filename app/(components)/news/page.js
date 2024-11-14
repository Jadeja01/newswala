// app/news/page.js (or wherever your component is used)
import Bus_news from "@/components/Bus_news";
import { cookies } from "next/headers";

export async function getServerSideProps() {
  const token = cookies().get("authToken")?.value || null;

  return {
    props: { token }, // Pass the token as a prop to the component
  };
}

export default function NewsPage({ token }) {
  return <Bus_news category="general" token={token} />;
}
