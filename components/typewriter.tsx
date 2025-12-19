"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  phrases: string[]
  speed?: number
  deleteSpeed?: number
  delayBetween?: number
}

export function Typewriter({
  phrases,
  speed = 50,
  deleteSpeed = 30,
  delayBetween = 2000,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        }, speed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetween)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, phraseIndex, isDeleting, phrases, speed, deleteSpeed, delayBetween])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
