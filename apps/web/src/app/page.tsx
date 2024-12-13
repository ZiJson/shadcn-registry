import ReactLive from "@/app/components/ReactLive"
import Features from "./components/Features"
import Inspiration from "./components/Inspiration"
import Integration from "./components/Integration"
import UseCases from "./components/UseCases"
import Workflow from "./components/Workflow"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20 sm:px-32">
      <ReactLive />
      <Integration />
      <Inspiration />
      <Features />
      <Workflow />
      <UseCases />
    </div>
  )
}
