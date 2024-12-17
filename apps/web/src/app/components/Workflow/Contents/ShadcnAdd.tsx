import CodeBlock from "@/components/CodeBlock"

const ShadcnAdd = () => {
  return <CodeBlock lang="bash" code={code} />
}

export default ShadcnAdd

const code = `npx shadcn@latest add $REGISTRY_URL`
