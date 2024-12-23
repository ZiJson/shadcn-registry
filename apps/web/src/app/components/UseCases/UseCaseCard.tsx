import { Card } from "@/components/ui/card"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/lib/utils"

interface Props {
  title: string
  description: string
  imgSrc: StaticImageData
}

const UseCaseCard = ({ title, description, imgSrc }: Props) => {
  return (
    <Card className="bg-muted/30 border-muted-foreground/20 relative flex h-[16rem] max-w-[21rem] flex-col items-center justify-end px-5 py-6 shadow-lg backdrop-blur-md">
      <Image
        src={imgSrc}
        alt="Publish"
        className={cn("absolute top-1 h-auto w-full opacity-80")}
      />
      <div className="px-3">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-muted-foreground/80 leading-tight">{description}</p>
      </div>
    </Card>
  )
}

export default UseCaseCard
