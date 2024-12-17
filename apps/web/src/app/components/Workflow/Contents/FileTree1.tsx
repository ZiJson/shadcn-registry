import CodeBlock from "@/components/CodeBlock"

function FileTree1() {
  return <CodeBlock lang="bash" code={code} />
}

export default FileTree1

const code = `.
|-- shadreg.config.tsx
|-- src
    |-- component
        |-- cool-text.tsx
`
