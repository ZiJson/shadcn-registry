"use client"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Demo } from "../ui/demo"
import { themes } from "prism-react-renderer"
import prettier from "prettier/standalone"
import estreePlugin from "prettier/plugins/estree"
import tsPlugin from "prettier/plugins/typescript"

const scope: Parameters<typeof LiveProvider>[0]["scope"] = {
  cn,
  ...React,
}

const HeroCode = `interface Props {
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
      <p className="w-full pb-4 text-center font-mono text-xl text-[#666666] md:text-xl dark:text-[#888888]">
        {description}
      </p>
      <p className="w-full text-center font-mono text-sm text-[#666666] md:text-base dark:text-[#888888]">
        {cmd}
      </p>
    </div>
  )
}`

const defaultDemoCode = `<Hero
    title="Share Your UI Library"
    description="Shadreg is a powerful CLI to build and publish Shadcn component registries, making your UI library globally accessible."
    cmd="npx shadreg@latest init"
/>`

const formatCode = async (code: string) => {
  return await prettier.format(code, {
    parser: "typescript",
    plugins: [estreePlugin, tsPlugin],
  })
}

const ReactLive = () => {
  const [componentCode, setComponentCode] = useState(HeroCode)
  const [demoCode, setDemoCode] = useState(defaultDemoCode)
  const fullCode = componentCode + "\nrender( " + (demoCode || "123") + " )"

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const formattedComponent = await formatCode(componentCode)
      const formattedDemo = await formatCode(demoCode)
      setDemoCode(formattedDemo.split(";")[0])
      setComponentCode(formattedComponent)
      clearTimeout(timerId)
    }, 2000)

    return () => clearTimeout(timerId)
  }, [componentCode, demoCode])

  return (
    <div className="grid grid-cols-5 gap-10 h-[calc(100vh-2rem)] sm:h-[calc(100vh-5rem)] ">
      <div className="col-span-3 ">
        <LiveProvider
          code={fullCode}
          scope={scope}
          noInline
          theme={themes.oneDark}
        >
          <Demo>
            <LivePreview />
          </Demo>
          <LiveError />
        </LiveProvider>
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center gap-5">
        <LiveProvider scope={scope} code={componentCode} theme={themes.oneDark}>
          <div className="text-background-foreground rounded-sm bg-orange-400/80 w-full">
            <p className="px-2 py-1 font-mono font-bold">Component</p>
            <LiveEditor
              className="max-h-[20rem] w-full overflow-auto rounded-sm text-sm no-scrollbar"
              onChange={(code) => {
                setComponentCode(code)
              }}
            />
          </div>
        </LiveProvider>
        <LiveProvider scope={scope} code={demoCode} theme={themes.oneDark}>
          <div className="text-background-foreground rounded-sm bg-orange-400/80 w-full">
            <p className="px-2 py-1 font-mono font-bold">Demo</p>
            <LiveEditor
              className="max-h-[20rem] w-full overflow-auto rounded-sm text-sm no-scrollbar" 
              onChange={(code) => setDemoCode(code)}
            />
          </div>
        </LiveProvider>
      </div>
    </div>
  )
}

export default ReactLive
