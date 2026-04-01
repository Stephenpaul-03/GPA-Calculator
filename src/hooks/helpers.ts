import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)")
    const handler = () => setIsMobile(media.matches)

    handler()
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  return isMobile
}
