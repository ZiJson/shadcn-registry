import ReactLive from "@/app/components/ReactLive"
import Features from "./components/Features"
import Inspiration from "./components/Inspiration"
import Integration from "./components/Integration"
import UseCases from "./components/UseCases"
import Workflow from "./components/Workflow"
import GradientEffect from "@/components/GradientEffect"
export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-8 pb-20 sm:px-32">
      <ReactLive />
      <Integration />
      <Inspiration />
      <Features />
      <Workflow />
      <UseCases />
      <GradientEffect
        type="secondary"
        className="animate-spin-slow absolute -right-1/4 top-40 -z-10 w-[60%] origin-[55%_55%] rounded-full opacity-30"
      />
      <GradientEffect
        type="secondary"
        className="animate-spin-slow absolute -left-64 top-0 -z-10 w-1/3 origin-[55%_55%] rounded-full opacity-50"
      />
    </div>
  )
}
