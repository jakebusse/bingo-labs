import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const varela_round = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bingo Labs",
  description: "Created by Jake Busse (JBLabs)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${varela_round.variable} ${varela_round.variable} antialiased overflow-hidden flex flex-row flex-nowrap w-screen h-screen`}
        >
          <Sidebar />
          <div className={`h-full w-5/6 overflow-y-scroll p-6 pl-16 mt-16`}>
            <Navbar />
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
