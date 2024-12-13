import Image from "next/image"
import NextLogo from "../../../../public/next.svg"
import ShadcnLogo from "../../../../public/shadcn.svg"
import VercelLogo from "../../../../public/vercel.svg"

const Integration = () => {
  return (
    <div className="from-primary/50 -mb-72 flex h-[30rem] w-screen items-start justify-center bg-gradient-to-b from-40% pt-20">
      <div className="flex gap-20">
        <Image
          src={NextLogo}
          alt="Next.js Logo"
          className="h-[30px] w-auto opacity-50"
        />
        <div className="flex items-center justify-center gap-2 opacity-50">
          <Image
            src={ShadcnLogo}
            alt="Shadcn Logo"
            className="h-[35px] w-auto"
          />
          <span className="hidden text-2xl font-semibold lg:inline-block">
            shadcn/ui
          </span>
        </div>
        <Image
          src={VercelLogo}
          alt="Vercel Logo"
          className="h-[30px] w-auto opacity-50"
        />
      </div>
    </div>
  )
}

export default Integration
