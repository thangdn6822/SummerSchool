import { PropsWithChildren } from "react";
import { Roboto } from "next/font/google";

import DashSidebar from "@/components/dashboard/DashSidebar";
import { Providers } from "@/redux/provider";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    absolute: "",
    default: "Dashboard - Trang chủ",
    template: "Dashboard - %s",
  },
  description: "Dashboard",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <html lang="vi">
        <head>
          <title>{metadata.title.default}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href={metadata.icons.icon[0]} />
        </head>
        <body className={roboto.className}>
          <div className="flex flex-col md:flex-row overflow-hidden">
            <DashSidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </body>
      </html>
    </Providers>
  );
}