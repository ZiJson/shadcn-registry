import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"

interface Props {
  title: string
  description: string
  imgSrc: StaticImageData
  gradient?: boolean
}

const FeatureCard = ({
  title,
  description,
  imgSrc,
  gradient = false,
}: Props) => {
  return (
    <Card className="bg-muted/30 border-muted-foreground/20 relative flex h-[16rem] max-w-[21rem] flex-col items-center justify-end px-5 py-6 shadow-lg">
      <Image
        src={imgSrc}
        alt="Publish"
        className={cn(
          "absolute top-5 h-auto w-[17rem] opacity-60",
          gradient &&
            "[mask-image:linear-gradient(to_top,transparent_20%,#000_60%)]",
        )}
      />
      <div className="px-5">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-muted-foreground/80 leading-tight">{description}</p>
      </div>
    </Card>
  )
}

export default FeatureCard
