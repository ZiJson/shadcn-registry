import FeatureCard from "./FeatureCard"

const Features = () => {
  return (
    <div className="min-h-screen pt-8">
      <h1 className="mb-9 text-center text-4xl font-bold">
        Why Choose shadreg?
      </h1>
      <div className="grid grid-cols-2 gap-5">
        <FeatureCard
          title="Easy Configuration"
          description="Quickly set up with a guided init command"
        />
        <FeatureCard
          title="Effortless Builds"
          description="Generate registry JSON files with a single build command"
        />
        <FeatureCard
          title="Seamless Publishing"
          description="Publish your registries to Vercel Blob Storage for public use"
        />
        <FeatureCard
          title="Next.js Ready"
          description="Easily integrate with Next.js API endpoints"
        />
      </div>
    </div>
  )
}

export default Features
