import { useEffect, useState, useRef, RefObject } from "react"

type UseItemInViewOptions = {
  root?: HTMLDivElement | null
  rootMargin?: string
  threshold?: number | number[]
}

type UseItemInViewReturn = [RefObject<HTMLDivElement>, number | null]

function useInView({
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: UseItemInViewOptions = {}): UseItemInViewReturn {
  const [inViewIndex, setInViewIndex] = useState<number | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setInViewIndex(index)
          }
        })
      },
      { root, rootMargin, threshold },
    )

    const element = elementRef.current
    if (element) {
      const children = element.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        child.setAttribute("data-index", String(i)) // 添加索引作為自定義屬性
        observer.observe(child)
      }
    }

    return () => {
      if (element) {
        const children = element.children
        for (let i = 0; i < children.length; i++) {
          observer.unobserve(children[i])
        }
      }
      observer.disconnect()
    }
  }, [root, rootMargin, threshold])

  return [elementRef, inViewIndex]
}

export default useInView
