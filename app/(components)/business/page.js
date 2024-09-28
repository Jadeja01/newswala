import Bus_news from "@/comp_code/news_sec/business.js";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "../navbar/page";
export default function Business() {
  return (
    <div>
      <Navbar />
      <Bus_news category="business"/>
    </div>
  );
}
