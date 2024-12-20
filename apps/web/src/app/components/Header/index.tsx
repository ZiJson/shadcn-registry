import { ModeToggle } from "@/components/ModeToggle"
import ShadRegLogo from "../../../../public/shadreg.svg"
import GitHubLogo from "../../../../public/github.svg"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between px-40 font-sans backdrop-blur-lg">
      <div className="flex h-full items-center gap-10">
        <Link href="/" className="flex h-full items-center gap-2">
          <Image src={ShadRegLogo} alt="Shadcn Logo" className="h-5 w-auto" />
          <p className="text-lg font-semibold text-white">shadreg</p>
        </Link>
        <div className="text-primary-foreground flex h-full items-center gap-3 opacity-80">
          <Link href="/#features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/#tutorial">
            <Button variant="ghost">Tutorial</Button>
          </Link>
          <Link href="/#use-cases">
            <Button variant="ghost">Use Cases</Button>
          </Link>
        </div>
      </div>
      <div>
        <Button size="icon" variant="ghost">
          <Image src={GitHubLogo} alt="GitHub Logo" className="h-5 w-auto" />
        </Button>
      </div>
    </header>
  )
}

export default Header
