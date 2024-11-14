import localFont from "next/font/local";
import "./globals.css";
import Main_Navbar from "./(components)/main_navbar/page";
import BootScript from "@/neccesarry/script";
import { TokenProvider } from "./TokenContext/TokenContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NewsWala",
  description: "News from all over world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TokenProvider>
          <Main_Navbar />
          {children}
        </TokenProvider>
        <BootScript />
      </body>
    </html>
  );
}
