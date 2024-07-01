import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/context/provider";
import Help from "@/components/help";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github Clone",
  description: "Created by Harsh Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Provider>

      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
        <Help/>
        {children}
      </ThemeProvider>
            </Provider>
        </body>
    </html>
  );
}
