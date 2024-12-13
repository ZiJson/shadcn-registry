import { MagicCard } from "@/components/ui/magic-card"

interface Props {
  title: string
  description: string
}

const FeatureCard = ({ title, description }: Props) => {
  return (
    <MagicCard className="flex items-center justify-center p-5">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
    </MagicCard>
  )
}

export default FeatureCard
