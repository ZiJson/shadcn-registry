import { ModeToggle } from "@/components/ModeToggle"

const Header = () => {
  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-center backdrop-blur-lg">
      shadreg
      <ModeToggle />
    </header>
  )
}

export default Header
