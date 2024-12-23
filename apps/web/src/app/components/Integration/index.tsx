import Image from "next/image"
import NextLogo from "../../../../public/next.svg"
import ShadcnLogo from "../../../../public/shadcn.svg"
import VercelLogo from "../../../../public/vercel.svg"
import ShinnyDivider from "@/components/ShinnyDivider"

const Integration = () => {
  return (
    <div className="from-primary/40 relative -z-10 -mb-80 flex h-[30rem] w-screen items-start justify-center bg-gradient-to-b from-40% pt-14">
      <div className="flex items-center gap-16">
        <Image
          src={NextLogo}
          alt="Next.js Logo"
          className="h-[20px] w-auto opacity-70"
        />
        <div className="flex items-center justify-center gap-2 opacity-70">
          <Image
            src={ShadcnLogo}
            alt="Shadcn Logo"
            className="h-[23px] w-auto"
          />
          <span className="hidden text-xl font-semibold lg:inline-block">
            shadcn/ui
          </span>
        </div>
        <Image
          src={VercelLogo}
          alt="Vercel Logo"
          className="h-[20px] w-auto opacity-70"
        />
      </div>
      <ShinnyDivider type="secondary" />
    </div>
  )
}

export default Integration
