import ShinnyDivider from "@/components/ShinnyDivider"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <div className="relative gap-10 px-40 py-4 text-sm">
      Made with ❤️ by{" "}
      <Button variant="link" className="text-primary-foreground p-0">
        <a href="https://github.com/ZiJson" target="_blank" rel="noreferrer">
          ZiJson
        </a>
      </Button>
      . The source code is available on{" "}
      <Button variant="link" className="text-primary-foreground p-0">
        <a
          href="https://github.com/ZiJson/shadcn-registry"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </Button>
      .
      <ShinnyDivider type="secondary" className="opacity-80" />
    </div>
  )
}

export default Footer
