"use client"

import { useEffect, useState } from "react"
import { BundledLanguage, codeToHtml } from "shiki"

interface Props {
  code: string
  lang: BundledLanguage
}

const CodeBlock = ({ code, lang }: Props) => {
  const [transferredCode, setTransferredCode] = useState("")

  useEffect(() => {
    codeToHtml(code, {
      lang: lang,
      theme: "github-dark",
    }).then((code) => {
      setTransferredCode(code)
    })
  }, [code, lang])

  return (
    <div className="bg-background relative min-w-[35rem] overflow-hidden rounded-sm pt-8 shadow-xl">
      <span className="bg-gradient-primary absolute left-0 top-8 h-1 w-full blur" />
      <span className="bg-gradient-primary absolute left-0 top-8 h-[1px] w-full" />
      <div className="absolute left-0 top-0 flex h-8 items-center gap-2 px-2">
        <span className="bg-primary aspect-square w-3 rounded-full" />
        <span className="bg-primary aspect-square w-3 rounded-full" />
        <span className="bg-primary aspect-square w-3 rounded-full" />
      </div>
      <div
        className="p-6 opacity-90"
        dangerouslySetInnerHTML={{ __html: transferredCode }}
      ></div>
    </div>
  )
}

export default CodeBlock
