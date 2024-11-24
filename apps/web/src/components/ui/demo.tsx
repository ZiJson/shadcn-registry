import { Card } from './card'

interface Props {
  children: React.ReactNode
}

export const Demo = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  )
}
