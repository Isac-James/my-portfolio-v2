import type { Metadata } from "next";
import "./globals.css";
import Cursor from "../components/Cursor"; 

export const metadata: Metadata = {
  title: "Tumininu Isaac Aiyegbusi | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // WE ADDED suppressHydrationWarning HERE 👇
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="antialiased bg-slate-900 text-slate-200"
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}