import { useMemo } from "react"
import InitQuestion from "./Contents/InitQuestion"
import ConfigFile from "./Contents/ConfigFile"
import FileTree1 from "./Contents/FileTree1"
import FileTree2 from "./Contents/FileTree2"
import NextAPIRoute from "./Contents/NextAPIRoute"
import PushVercel from "./Contents/PushVercel"
import ShadcnAdd from "./Contents/ShadcnAdd"
import GradientEffect from "@/components/GradientEffect"

interface Props {
  stepIndex: number
}

const StickyContent = ({ stepIndex }: Props) => {
  const Content = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return <InitQuestion />
      case 1:
        return <ConfigFile />
      case 2:
        return <FileTree1 />
      case 3:
        return <FileTree2 />
      case 4:
        return <NextAPIRoute />
      case 5:
        return <PushVercel />
      case 6:
        return <ShadcnAdd />
    }
  }, [stepIndex])
  return (
    <div className="from-primary to-primary/30 sticky left-0 top-0 flex h-screen flex-1 items-center justify-center rounded-l-3xl bg-gradient-to-br">
      {Content}
      <GradientEffect
        type="secondary"
        className="animate-spin-slower absolute right-1/2 top-10 -z-10 h-full w-full opacity-10"
      />
      <GradientEffect
        type="secondary"
        className="absolute right-1/2 h-1/4 w-1/4 opacity-15"
      />
    </div>
  )
}

export default StickyContent
