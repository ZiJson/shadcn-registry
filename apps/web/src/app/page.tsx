import ReactLive from "@/app/components/ReactLive"
import Features from "./components/Features"
import Inspiration from "./components/Inspiration"
import Integration from "./components/Integration"
import UseCases from "./components/UseCases"
import Workflow from "./components/Workflow"
import GradientEffect from "@/components/GradientEffect"
export default function Home() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center px-8 pb-20 sm:px-32">
      <ReactLive />
      <Integration />
      <Inspiration />
      <Features />
      <Workflow />
      <UseCases />
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <GradientEffect
          type="secondary"
          className="animate-spin-slow absolute -right-1/4 top-40 -z-10 w-[60%] origin-[55%_55%] rounded-full opacity-30"
        />
        <GradientEffect
          type="secondary"
          className="animate-spin-slow absolute -left-64 top-0 -z-10 w-1/3 origin-[55%_55%] rounded-full opacity-50"
        />
        <GradientEffect
          type="secondary"
          className="animate-spin-slower absolute right-[70%] top-[13%] -z-10 aspect-[1.1] w-[60rem] origin-[60%_60%] rounded-full opacity-20 blur-[150px]"
        />
        <GradientEffect className="animate-spin-slower absolute left-[75%] top-[20%] -z-10 w-[40rem] origin-[60%_60%] rounded-full opacity-20 blur-[100px]" />
      </div>
    </div>
  )
}
