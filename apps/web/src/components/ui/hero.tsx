import { Check, Clipboard } from "lucide-react"
import { useState } from "react"

interface Props {
  title: string
  description: string
  cmd: string
}

const Hero = ({ title, description, cmd }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    const timeout = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timeout) // Cleanup on unmount
  }

  return (
    <div className="w-full p-20 pb-24">
      <h1 className="w-full bg-gradient-to-b from-black/80 to-black bg-clip-text pb-4 text-center text-5xl font-extrabold leading-tight text-transparent lg:text-6xl xl:leading-snug dark:from-white dark:to-[#AAAAAA]">
        {title}
      </h1>
      <p className="max-h-[00px] w-full pb-4 text-center font-mono text-xl text-[#666666] md:max-h-[96px] md:text-xl dark:text-[#888888]">
        {description}
      </p>
      <button
        className="group flex w-full cursor-pointer items-center justify-center gap-2 text-center font-mono text-sm text-[#666666] md:text-base dark:text-[#888888]"
        onClick={handleCopy}
        aria-label="Copy command"
      >
        {cmd}
        {copied ? (
          <Check size={18} strokeWidth={2.5} />
        ) : (
          <Clipboard
            size={18}
            strokeWidth={2}
            className="opacity-0 transition-all group-hover:opacity-100"
          />
        )}
      </button>
    </div>
  )
}

export default Hero
