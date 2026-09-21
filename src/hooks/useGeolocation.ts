import { useCallback, useState } from 'react'
import type { LatLng } from '../utils/distance'

type GeoStatus = 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported'

interface GeolocationState {
  location: LatLng | null
  status: GeoStatus
  requestLocation: () => void
}

export function useGeolocation(): GeolocationState {
  const [location, setLocation] = useState<LatLng | null>(null)
  const [status, setStatus] = useState<GeoStatus>('idle')

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }

    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setStatus('granted')
      },
      () => {
        setStatus('denied')
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    )
  }, [])

  return { location, status, requestLocation }
}
