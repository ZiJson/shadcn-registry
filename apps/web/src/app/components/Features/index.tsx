import GradientEffect from "@/components/GradientEffect"
import FeatureCard from "./FeatureCard"
import IntegrationImage from "./imgs/integration.png"
import PublishImage from "./imgs/publish.png"
import TerminalImage from "./imgs/terminal.png"
import FilesImage from "./imgs/files.png"

const Features = () => {
  return (
    <div className="min-h-screen pt-24" id="features">
      <h1 className="mb-16 text-center text-2xl font-bold">
        Why Choose shadreg?
      </h1>
      <div className="relative grid grid-cols-2 gap-2">
        <FeatureCard
          title="Easy Configuration"
          description="Quickly set up with a guided init command"
          imgSrc={TerminalImage}
        />
        <FeatureCard
          title="Effortless Builds"
          description="Generate registry JSON files with a single build command"
          imgSrc={FilesImage}
        />
        <FeatureCard
          title="Seamless Publishing"
          description="Publish your registries to Vercel Blob Storage for public use"
          imgSrc={PublishImage}
        />
        <FeatureCard
          title="Next.js Ready"
          description="Easily integrate with Next.js API endpoints"
          imgSrc={IntegrationImage}
        />
        <GradientEffect className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]" />
      </div>
    </div>
  )
}

export default Features
