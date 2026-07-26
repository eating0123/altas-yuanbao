import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "未完地图｜元宝时空记忆 Agent",
  description:
    "地图记得你在哪里停下，元宝知道接下来做什么。一个会在重返旧地时主动续上未完心愿的时空记忆 Agent。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "未完地图｜元宝时空记忆 Agent",
    description: "回到一个地方，也续上那时未完成的自己。",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "未完地图｜元宝时空记忆 Agent",
    description: "地图记得你在哪里停下，元宝知道接下来做什么。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
