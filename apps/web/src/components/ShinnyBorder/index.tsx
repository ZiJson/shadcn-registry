import { cn } from "@/lib/utils"

interface Props {
  className?: string
  children: React.ReactNode
}

const ShinnyBorder = ({ className, children }: Props) => {
  return (
    <div className={cn("relative h-fit w-fit")}>
      <div
        className={cn("relative overflow-hidden rounded-[3rem] p-5", className)}
      >
        <div className="bg-gradient-secondary animate-spin-slow absolute -left-5 -top-5 -z-10 h-[130%] w-[130%] blur" />
        {children}
      </div>
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden rounded-[3rem] opacity-80 blur-lg">
        <div className="bg-gradient-secondary absolute left-0 top-0 -z-10 h-full w-full" />
      </div>
    </div>
  )
}

export default ShinnyBorder
