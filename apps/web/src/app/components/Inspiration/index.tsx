import ShinnyBorder from "@/components/ShinnyBorder"
import Card from "./Card"
import ShadRegLogo from "../../../../public/shadreg.svg"
import Image from "next/image"

const Inspiration = () => {
  return (
    <div className="relative grid min-h-screen grid-cols-1 gap-20 py-40 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-1">
        <Card
          title="Inspired by ShadCN's CLI:"
          description="The ShadCN CLI’s URL-based component installation inspired shadreg — a tool for developers to effortlessly create and share their own UI libraries."
        />
        <Card
          title="Built for Developers, by a Developer:"
          description="I envisioned a solution that doesn’t just help developers manage their components but empowers them to extend the ShadCN approach to their own custom libraries."
        />
        <Card
          title="Contentlayer.js Influence:"
          description="Drawing from the well-structured, Next.js-ready design of Contentlayer.js, shadreg incorporates the same developer-friendly principles, ensuring a smooth integration into modern Next.js projects."
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <ShinnyBorder className="rounded-[3rem] p-4">
          <div className="bg-background/80 flex aspect-square w-28 items-center justify-center rounded-[2rem] shadow-xl">
            <Image src={ShadRegLogo} alt="ShadReg Logo" className="h-16 w-16" />
          </div>
        </ShinnyBorder>
        <h2 className="font-mono text-4xl font-extrabold">Shadreg</h2>
        <em className="text- w-96 text-lg opacity-80">
          &quot;Join the movement to build and share your own UI libraries.
          Start creating with <code>shadreg</code> today! &quot;
        </em>
      </div>
    </div>
  )
}

export default Inspiration
