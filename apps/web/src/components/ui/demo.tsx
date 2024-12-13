import { Check, Clipboard, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"
import { codeToHtml } from "shiki"
import { useTheme } from "next-themes"

interface Props {
  children: React.ReactNode
  cmd: string
  onClick?: () => Promise<void>
}

export const Demo = ({
  children,
  cmd = "npx shadcn@latest add",
  onClick,
}: Props) => {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [code, serCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  codeToHtml(cmd, {
    lang: "bash",
    theme: "dracula",
  })
  useEffect(() => {
    codeToHtml(cmd, {
      lang: "bash",
      theme: theme === "dark" ? "github-dark" : "github-light",
    }).then((code) => {
      serCode(code)
    })
  }, [cmd, theme])

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onClick?.()
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    const timeout = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timeout) // Cleanup on unmount
  }
  return (
    <div className="group/demo flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="group-hover/demo:border-border flex min-h-[30rem] max-w-3xl items-center justify-center rounded-2xl border border-transparent p-8 transition-all duration-300 group-hover/demo:shadow-lg">
        {children}
      </div>
      {code && (
        <div className="flex flex-col opacity-0 transition-all duration-300 group-hover/demo:opacity-100">
          <p className="pl-1 text-sm text-gray-400">UI Installation :</p>
          <div className="flex items-center gap-2">
            <div className="bg-background border-border flex gap-5 rounded-sm border px-4 py-1">
              <p
                className="max-w-[20rem] truncate"
                dangerouslySetInnerHTML={{ __html: code }}
              ></p>
              <button onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
              </button>
            </div>
            {onClick && (
              <Button onClick={handleClick}>
                <div className="flex items-center justify-center gap-2">
                  Publish{" "}
                  {isLoading && <LoaderCircle className="animate-spin" />}
                </div>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
