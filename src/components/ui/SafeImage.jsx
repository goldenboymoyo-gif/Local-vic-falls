import React, { useState } from 'react'

const FALLBACKS = {
  adventure: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
  food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop',
  culture: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=500&fit=crop',
  stay: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
  default: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=500&fit=crop',
}

function getFallback(pillar) {
  return FALLBACKS[pillar] || FALLBACKS.default
}

export default function SafeImage({ src, alt, className, pillar, loading = 'lazy', ...props }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasErrored, setHasErrored] = useState(false)

  const handleError = () => {
    if (!hasErrored) {
      setImgSrc(getFallback(pillar))
      setHasErrored(true)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      className={className}
      loading={loading}
      onError={handleError}
      {...props}
    />
  )
}
