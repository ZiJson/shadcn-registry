const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-20 text-center">
      <h1 className="text-3xl font-bold">shadreg</h1>
      <p className="text-muted-foreground">
        A registry for sharing and discovering UI components
      </p>
      <div className="flex gap-10">
        <a
          href="https://github.com/shadcn/shadcn-registry"
          target="_blank"
          rel="noreferrer"
        >
          <button className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md px-4 py-2">
            GitHub
          </button>
        </a>
        <a href="https://twitter.com/shadcn" target="_blank" rel="noreferrer">
          <button className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md px-4 py-2">
            Twitter
          </button>
        </a>
      </div>
    </div>
  )
}

export default Footer
