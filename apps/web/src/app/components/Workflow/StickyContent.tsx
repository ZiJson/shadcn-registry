import { useMemo } from "react"
import InitQuestion from "./Contents/InitQuestion"
import ConfigFile from "./Contents/ConfigFile"
import FileTree1 from "./Contents/FileTree1"
import FileTree2 from "./Contents/FileTree2"
import NextAPIRoute from "./Contents/NextAPIRoute"
import PushVercel from "./Contents/PushVercel"
import ShadcnAdd from "./Contents/ShadcnAdd"

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
    <div className="bg-primary/50 sticky bottom-auto top-0 flex h-screen flex-1 items-center justify-center">
      {Content}
    </div>
  )
}

export default StickyContent
