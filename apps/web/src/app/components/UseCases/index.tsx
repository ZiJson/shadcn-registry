import Card from "./Card"

const UseCases = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className="mb-10 text-center text-3xl font-bold">
        How Developers Use shadreg
      </h1>
      <div className="flex gap-8">
        <Card
          title="Public Component Sharing"
          description="Publish your components to Vercel Blob Storage and share them via URLs for easy integration."
        />
        <Card
          title="Create Your Own UI Library"
          description="Build and manage a custom UI library that’s shareable with the ShadCN CLI."
        />
        <Card
          title="Seamless Team Collaboration"
          description="Standardize and document UI components for team-wide consistency."
        />
      </div>
    </div>
  )
}

export default UseCases
