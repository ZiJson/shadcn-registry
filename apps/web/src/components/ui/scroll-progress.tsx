"use client"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ScrollProgressProps {
  className?: string
}

export default function ScrollProgress({ className }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const scrollPosition = window.scrollY

      // Get the total scrollable height
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight

      // Calculate the scroll progress as a percentage
      const scrollProgress = (scrollPosition / totalHeight) * 100
      setScrollProgress(scrollProgress)

      console.log(`Scroll Progress: ${scrollProgress.toFixed(2)}%`)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <div
      className={cn(
        "fixed left-4 top-0 z-[1000] h-4 origin-left rounded-r-full border-2 border-red-500",
        className,
      )}
      style={{
        width: `${scrollProgress}%`,
        background: `repeating-linear-gradient(
      90deg,
      white,
      white 2px,
      black 1px,
      black 10px
    )`,
        transform: "skewX(-20deg)", // Apply the skew to the left edge
        transformOrigin: "left", // Make sure the skew happens from the left
      }}
    />
  )
}
