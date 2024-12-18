import { cn } from "@/lib/utils"

interface Props {
  className?: string
  type?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const ShinnyDivider = ({ className, type = "primary", size = "md" }: Props) => {
  return (
    <div className={cn("absolute left-0 top-0 h-fit w-full", className)}>
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden",
          size === "sm" ? "h-[1px]" : size === "lg" ? "h-1" : "h-[2px]",
        )}
      >
        <div
          className={cn(
            "animate-spin-slower aspect-square w-full blur",
            type === "primary"
              ? "bg-gradient-primary"
              : "bg-gradient-secondary",
          )}
        />
      </div>
      <div
        className={cn(
          "absolute left-0 top-1/2 flex h-2 w-full -translate-y-1/2 items-center justify-center overflow-hidden",
          size === "sm"
            ? "h-1 blur"
            : size === "lg"
              ? "h-3 blur-lg"
              : "h-2 blur-md",
        )}
      >
        <div
          className={cn(
            "animate-spin-slower aspect-square w-full",
            type === "primary"
              ? "bg-gradient-primary"
              : "bg-gradient-secondary",
          )}
        />
      </div>
    </div>
  )
}

export default ShinnyDivider
