
import { PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/header/Banner";
import { Providers } from "@/redux/provider";

const roboto = Roboto({ subsets: ['vietnamese'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: {
    absolute: "",
    default: "CodeCamp - Trang chủ",
    template: "CodeCamp - %s",
  },
  description: "CodeCamp",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="">
      <body className={roboto.className}>
          <div className="flex flex-col overflow-hidden">
            <main className="flex-1">{children}</main>
          </div>
      </body>
    </html>
    </Providers>
  );
}
