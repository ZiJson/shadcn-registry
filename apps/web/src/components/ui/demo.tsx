interface Props {
  children: React.ReactNode
}

export const Demo = ({ children }: Props) => {
  return (
    <div className="group/demo flex h-full w-full items-center justify-center">
      <div className="group-hover/demo:border-border flex min-h-[30rem] max-w-3xl items-center justify-center rounded-2xl border border-transparent p-8 transition-all duration-300 group-hover/demo:shadow-lg">
        {children}
      </div>
    </div>
  )
}
