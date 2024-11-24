interface Props {
  title: string
  description: string
  cmd: string
}

const Hero = ({ title, description, cmd }: Props) => {
  return (
    <div className="w-full pb-24">
      <h1 className="w-full bg-gradient-to-b from-black/80 to-black bg-clip-text pb-4 text-center text-5xl font-extrabold leading-tight text-transparent lg:text-6xl xl:leading-snug dark:from-white dark:to-[#AAAAAA]">
        {title}
      </h1>
      <p className="max-h-[112px] w-full pb-4 text-center font-mono text-xl text-[#666666] md:max-h-[96px] md:text-xl dark:text-[#888888]">
        {description}
      </p>
      <p className="w-full text-center font-mono text-sm text-[#666666] md:text-base dark:text-[#888888]">
        {cmd}
      </p>
    </div>
  )
}

export default Hero
