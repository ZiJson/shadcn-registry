"use client"

import useItemInView from "@/hooks/useItemInView"
import { useEffect } from "react"

interface Props {
  steps: string[]
  onStepChange: (index: number) => void
}

const Steps = ({ steps, onStepChange }: Props) => {
  const [ref, index] = useItemInView({ threshold: 0.6 })

  useEffect(() => {
    if (index !== null) {
      onStepChange(index)
    }
  }, [index, onStepChange])

  return (
    <div className="relative flex flex-1 flex-col" ref={ref}>
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex min-h-[100vh] items-center justify-center p-20 text-6xl font-bold leading-snug"
        >
          {step}
        </div>
      ))}
    </div>
  )
}

export default Steps
