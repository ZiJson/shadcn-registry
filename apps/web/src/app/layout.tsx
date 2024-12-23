import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer/indes"
import ScrollProgress from "@/components/ui/scroll-progress"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ScrollProgress className="top-16 h-[3px] opacity-70" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
