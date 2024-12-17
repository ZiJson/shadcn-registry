import { cn } from "@/lib/utils"

interface Props {
  type?: "primary" | "secondary"
  className?: string
}

const GradientEffect = ({ className, type = "primary" }: Props) => {
  return (
    <div
      className={cn(
        "-z-10 aspect-square w-1/4 opacity-50 bg-blend-overlay blur-[150px]",
        type === "primary" ? "bg-gradient-primary" : "bg-gradient-secondary",
        className,
      )}
    />
  )
}

export default GradientEffect
