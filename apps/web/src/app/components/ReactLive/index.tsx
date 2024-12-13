"use client"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Demo } from "../../../components/ui/demo"
import { themes } from "prism-react-renderer"
import prettier from "prettier/standalone"
import estreePlugin from "prettier/plugins/estree"
import tsPlugin from "prettier/plugins/typescript"
import { Check, Clipboard } from "lucide-react"
import { uploadRegistry, deleteRegistry } from "@/actions/vercel"

const scope: Parameters<typeof LiveProvider>[0]["scope"] = {
  cn,
  Check,
  Clipboard,
  ...React,
}

const HeroCode = `interface Props {
  title: string;
  description: string;
  cmd: string;
}

const Hero = ({ title, description, cmd }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    const timeout = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  };

  return (
    <div className="w-full pb-24">
      <h1 className="w-full bg-gradient-to-b from-black/80 to-black bg-clip-text pb-4 text-center text-5xl font-extrabold leading-tight text-transparent lg:text-6xl xl:leading-snug dark:from-white dark:to-[#AAAAAA]">
        {title}
      </h1>
      <p className="max-h-[80px] w-full pb-4 text-center font-mono text-xl text-[#666666] md:max-h-[96px] md:text-xl dark:text-[#888888]">
        {description}
      </p>
      <button
        className="group flex w-full cursor-pointer items-center justify-center gap-2 text-center font-mono text-sm text-[#666666] md:text-base dark:text-[#888888]"
        onClick={handleCopy}
        aria-label="Copy command"
      >
        {cmd}
        {copied ? (
          <Check size={18} strokeWidth={4} />
        ) : (
          <Clipboard
            size={18}
            strokeWidth={2}
            className="opacity-0 transition-all group-hover:opacity-100"
          />
        )}
      </button>
    </div>
  );
};`

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
  const [url, setUrl] = useState("")

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

  const publishRegistry = async (code: string) => {
    url && (await deleteRegistry(url))
    const registryUrl = await uploadRegistry(code)
    setUrl(registryUrl)
  }

  return (
    <div className="grid h-[calc(100vh-2rem)] grid-cols-5 gap-5 sm:h-[calc(100vh-5rem)]">
      <div className="col-span-3">
        <LiveProvider
          code={fullCode}
          scope={scope}
          noInline
          theme={themes.oneDark}
          language="tsx"
        >
          <Demo
            cmd={"npx shadcn@latest add " + url}
            onClick={() => publishRegistry(fullCode)}
          >
            <LivePreview />
          </Demo>
          <LiveError />
        </LiveProvider>
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center gap-5">
        <LiveProvider
          scope={scope}
          code={demoCode}
          theme={themes.oneDark}
          language="tsx"
        >
          <div className="text-primary-foreground bg-primary w-full rounded-sm shadow-lg">
            <p className="px-2 py-1 font-bold">Demo</p>
            <LiveEditor
              className="no-scrollbar max-h-[20rem] w-full overflow-auto rounded-sm text-sm"
              onChange={(code) => setDemoCode(code)}
            />
          </div>
        </LiveProvider>
        <LiveProvider
          scope={scope}
          code={componentCode}
          theme={themes.oneDark}
          language="tsx"
        >
          <div className="text-primary-foreground bg-primary w-full rounded-sm shadow-lg">
            <p className="px-2 py-1 font-bold">Component</p>
            <LiveEditor
              className="no-scrollbar max-h-[20rem] w-full overflow-auto rounded-sm text-sm"
              onChange={(code) => {
                setComponentCode(code)
              }}
            />
          </div>
        </LiveProvider>
      </div>
    </div>
  )
}

export default ReactLive
