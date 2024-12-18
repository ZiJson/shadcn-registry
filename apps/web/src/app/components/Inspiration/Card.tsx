interface Props {
  title: string
  description: string
}

const Card = ({ title, description }: Props) => {
  return (
    <div className="hover:bg-muted-foreground/15 group max-w-[30rem] translate-x-1 cursor-default rounded-md p-4 transition-all duration-300 hover:translate-x-0 hover:shadow-xl">
      <h1 className="text-muted-foreground group-hover:text-primary-foreground/80 text-xl font-bold transition-all duration-300">
        {title}
      </h1>
      <p className="text-muted-foreground/80 group-hover:text-muted-foreground text-lg transition-all duration-300">
        {description}
      </p>
    </div>
  )
}

export default Card
