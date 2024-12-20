"use client"

import StickyContent from "./StickyContent"
import Steps from "./Steps"
import { useState } from "react"

const Workflow = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  console.log(stepIndex)
  return (
    <div className="flex w-screen" id="tutorial">
      <Steps steps={steps} onStepChange={setStepIndex} />
      <StickyContent stepIndex={stepIndex} />
    </div>
  )
}

export default Workflow

const steps = [
  "Run the initialize command, answer some silly questions",
  "And you will get a config file",
  "Create your component in the right place, and modify the config",
  "Run the build command to generate your registry",
  "If you are using Next.js, write a API route to serve your registry",
  "If you are nuts, provide a Vercel token and run the publish command to make it public",
  "Share your component with the world !!",
]
