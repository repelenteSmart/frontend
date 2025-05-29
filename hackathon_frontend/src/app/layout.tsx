import type { Metadata } from "next";
import "./globals.css";
import {Montserrat} from 'next/font/google';
import { ThemeProvider } from "@/app/providers";

const font = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Repelente Smart",
  description: "Hackathon - Repelente Smart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={font.className} style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}