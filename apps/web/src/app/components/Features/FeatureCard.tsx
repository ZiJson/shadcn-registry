import { MagicCard } from "@/components/ui/magic-card"

interface Props {
  title: string
  description: string
}

const FeatureCard = ({ title, description }: Props) => {
  return (
    <MagicCard
      className="flex h-[18rem] max-w-[30rem] items-center justify-center border-none p-5"
      gradientColor="rgb(166 76 223)"
      gradientOpacity={0.1}
      gradientSize={500}
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
    </MagicCard>
  )
}

export default FeatureCard
