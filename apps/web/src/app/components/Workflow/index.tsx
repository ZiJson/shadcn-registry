"use client"

import StickyContent from "./StickyContent"
import Steps from "./Steps"
import { useState } from "react"

const Workflow = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  console.log(stepIndex)
  return (
    <div className="flex w-screen">
      <Steps steps={steps} onStepChange={setStepIndex} />
      <StickyContent stepIndex={stepIndex} />
    </div>
  )
}

export default Workflow

const steps = [
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
  "Run the initialize command, answer some silly questions",
]
