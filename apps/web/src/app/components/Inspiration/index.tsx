import Card from "./Card"

const Inspiration = () => {
  return (
    <div className="grid grid-cols-2 gap-20 p-40 px-80">
      <div className="flex flex-col items-center justify-center gap-8">
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
        <div className="bg-primary aspect-square w-36 rounded-[2rem] shadow-xl" />
        <h2 className="font-mono text-4xl font-extrabold">Shadreg</h2>
        <em className="text- w-96 text-lg">
          &quot;Join the movement to build and share your own UI libraries.
          Start creating with <code>shadreg</code> today! &quot;
        </em>
      </div>
    </div>
  )
}

export default Inspiration
