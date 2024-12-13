interface Props {
  title: string
  description: string
}

const Card = ({ title, description }: Props) => {
  return (
    <div className="">
      <h1 className="text-primary-foreground/60 text-2xl font-bold">{title}</h1>
      <p className="text-primary-foreground/40 text-lg">{description}</p>
    </div>
  )
}

export default Card
