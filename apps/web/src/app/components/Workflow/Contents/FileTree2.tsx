import CodeBlock from "@/components/CodeBlock"

function FileTree2() {
  return (
    <div className="flex flex-col gap-5">
      <CodeBlock lang="bash" code={code1} />
      <CodeBlock lang="bash" code={code2} />
    </div>
  )
}

export default FileTree2

const code1 = `.
|-- shadreg.config.tsx
|-- src/
    |-- component
        |-- cool-text.tsx
`

const code2 = `.
|-- shadreg.config.tsx
|-- shadreg/
    |-- _generated.json
    |-- cool-text.json
    |-- index.mjs 
    |-- index.d.ts 

`
