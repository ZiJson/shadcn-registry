import CodeBlock from "@/components/CodeBlock"

const PushVercel = () => {
  return <CodeBlock lang="bash" code={code} />
}

export default PushVercel

const code = `BLOB_READ_WRITE_TOKEN="************"`
