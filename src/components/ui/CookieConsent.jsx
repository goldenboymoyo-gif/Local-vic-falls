import React, { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-[var(--color-border-light)] p-5 sm:p-6 pointer-events-auto">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[var(--color-ink)] font-semibold text-sm mb-1">We use cookies</h3>
            <p className="text-[var(--color-ink-muted)] text-xs leading-relaxed">
              We use cookies to improve your experience, remember your preferences, and analyse site traffic. By clicking "Accept", you agree to our use of cookies.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleAccept}
                className="btn btn-primary btn-sm"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="btn btn-sm bg-[var(--color-surface)] text-[var(--color-ink-light)] border border-[var(--color-border)] hover:bg-[var(--color-surface-warm)]"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
