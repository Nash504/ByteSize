"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"

export default function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef(null)

  // Handle iframe loading completion
  const handleIframeLoad = () => {
    setIsLoading(false)
    
    try {
      // Check if the iframe URL contains the confirmation page
      const iframeUrl = iframeRef.current.contentWindow.location.href
      if (iframeUrl.includes("formResponse") || iframeUrl.includes("closedform")) {
        toast.success("Thank you for your feedback!")
      }
    } catch (error) {
      // Silently fail if we can't access the URL due to CORS
    }
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <p>Loading form...(if doesn't load,refresh the page)</p>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src="https://docs.google.com/forms/d/e/1FAIpQLSdxNALSjLtUoaym4xxsTjJ623beutnTEIwlQBgVtj1brhJ41Q/viewform?usp=header" 
        width="100%" 
        height="600px" 
        onLoad={handleIframeLoad}
        className={`border-none transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        Loading Google Form...
      </iframe>
    </div>
  )
}
