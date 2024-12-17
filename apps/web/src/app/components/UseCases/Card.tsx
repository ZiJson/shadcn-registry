interface Props {
  title: string
  description: string
}

const Card = ({ title, description }: Props) => {
  return (
    <div className="bg-primary/30 flex h-48 w-80 flex-col items-start justify-start gap-4 rounded-md p-4 pt-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default Card
