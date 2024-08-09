import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UShort - URL Shortener",
  description: "Shorten and analyze URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className + " bg-slate-100"}>
          <AppRouterCacheProvider>
            <div className="max-w-[70vw] pt-[10rem] pb-[5rem] mx-auto">
              <h1 className="text-3xl w-full text-center">
                UShort - URL Shortener
              </h1>
              <div>{children}</div>
            </div>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
