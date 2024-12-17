import CodeBlock from "@/components/CodeBlock"

const NextAPIRoute = () => {
  return <CodeBlock lang="ts" code={code} />
}

export default NextAPIRoute

const code = `import { NextResponse } from "next/server"
import { allRegistries } from "@/shadreg"

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params
  const registry = allRegistries.find((entry) => entry.name === name)

  if (!registry) {
    return NextResponse.json(
      { error: \`Registry with name "\${name}" not found\` },
      { status: 404 },
    )
  }

  return NextResponse.json(registry.entry)
}`
