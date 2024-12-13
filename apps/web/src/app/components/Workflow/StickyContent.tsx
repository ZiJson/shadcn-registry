interface Props {
  stepIndex: number
}

const StickyContent = ({ stepIndex }: Props) => {
  return (
    <div className="bg-primary/50 sticky bottom-auto top-0 flex h-screen flex-1 items-center justify-center">
      StickyContent{stepIndex}
    </div>
  )
}

export default StickyContent
