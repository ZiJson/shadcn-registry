import GradientEffect from "@/components/GradientEffect"
import UseCaseCard from "./UseCaseCard"
import NetworkImage from "./imgs/network.png"
import LibraryImage from "./imgs/library.png"
import SharingImage from "./imgs/sharing.png"

const UseCases = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center gap-10"
      id="use-cases"
    >
      <h1 className="mb-10 text-center text-2xl font-bold">
        How Developers Use shadreg
      </h1>
      <div className="flex gap-4">
        <UseCaseCard
          title="Public Component Sharing"
          description="Publish your components to Vercel Blob Storage and share them via URLs for easy integration."
          imgSrc={NetworkImage}
        />
        <UseCaseCard
          title="Create Your Own UI Library"
          description="Build and manage a custom UI library that’s shareable with the ShadCN CLI."
          imgSrc={LibraryImage}
        />
        <UseCaseCard
          title="Seamless Team Collaboration"
          description="Standardize and document UI components for team-wide consistency."
          imgSrc={SharingImage}
        />
      </div>
      <GradientEffect className="animate-pulse-slow absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[200px]" />
    </div>
  )
}

export default UseCases
