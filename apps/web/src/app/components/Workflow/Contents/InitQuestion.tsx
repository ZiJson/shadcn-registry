import CodeBlock from "@/components/CodeBlock"

const InitQuestion = () => {
  return <CodeBlock lang="bash" code={code} />
}

export default InitQuestion

const code = `npx shadreg init
✔ A shadreg.config.ts file already exists. Overwrite it? Yes
✔ Enter the output directory: ./shadreg
✔ Enter the base url of your components: ./src/components
✔ Do you want to include registry example? Yes`
