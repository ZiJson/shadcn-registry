import CodeBlock from "@/components/CodeBlock"

function FileTree2() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      <CodeBlock lang="bash" code={code2} />
      <div className="absolute bottom-[1.2rem] h-[6.5rem] w-full bg-green-200/20" />
    </div>
  )
}

export default FileTree2

const code2 = `.
|-- shadreg.config.tsx
|-- src/
    |-- component
        |-- cool-text.tsx
|-- shadreg/
    |-- _generated.json
    |-- cool-text.json
    |-- index.mjs 
    |-- index.d.ts
`
