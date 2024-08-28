import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "../context/AuthContext";
import Auth from "../context/Auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PermitChain",
  description: "Online permit management system based on blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContext>
        {/*<Auth>*/}
        <body className={inter.className}>{children}</body>
        {/* </Auth> */}
      </AuthContext>
    </html>
  );
}
