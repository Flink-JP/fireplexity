'use client'

import React, { useEffect, useRef, memo } from 'react'

interface TradingViewWidgetProps {
  symbol: string
  theme?: 'light' | 'dark'
}

function TradingViewWidget({ symbol, theme = 'light' }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>(`tradingview_${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    if (!containerRef.current) return

    const containerId = widgetIdRef.current

    // Clear any existing content
    containerRef.current.innerHTML = `<div id="${containerId}" style="height: 100%; width: 100%;"></div>`

    // Load the main TradingView library
    const mainScript = document.createElement('script')
    mainScript.src = 'https://s3.tradingview.com/tv.js'
    mainScript.async = true

    mainScript.onload = () => {
      // Create the widget initialization script
      const widgetScript = document.createElement('script')
      widgetScript.type = 'text/javascript'
      widgetScript.innerHTML = `
        new TradingView.widget({
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${theme}",
          "style": "2",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "${containerId}",
          "height": 300,
          "width": "100%"
        });
      `
      
      document.head.appendChild(widgetScript)
    }

    document.head.appendChild(mainScript)

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      // Remove scripts from head
      const scripts = document.head.querySelectorAll('script[src*="tradingview"], script:not([src])')
      scripts.forEach(script => {
        if (script.innerHTML.includes(containerId)) {
          document.head.removeChild(script)
        }
      })
    }
  }, [symbol, theme])

  return (
    <div 
      className="tradingview-widget-container opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:400ms] [animation-fill-mode:forwards] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700" 
      ref={containerRef} 
      style={{ height: '300px', width: '100%' }}
    />
  )
}

export default memo(TradingViewWidget)