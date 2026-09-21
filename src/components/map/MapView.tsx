import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import type { CoffeePlace } from '../../types/coffee'
import type { LatLng } from '../../utils/distance'
import { haversineDistanceKm, formatDistance } from '../../utils/distance'
import { createCoffeeIcon, createUserLocationIcon } from './markerIcon'
import { MapPreviewCard } from './MapPreviewCard'

function createClusterIcon(cluster: { getChildCount: () => number }) {
  const count = cluster.getChildCount()
  const size = count < 10 ? 38 : count < 25 ? 46 : 54
  return L.divIcon({
    html: `<div class="cute-cluster" style="width:${size}px;height:${size}px;font-size:${count < 10 ? 13 : 14.5}px;">${count}</div>`,
    className: '',
    iconSize: [size, size],
  })
}

const MUMBAI_CENTER: [number, number] = [19.09, 72.92]

interface MapViewProps {
  places: CoffeePlace[]
  activePlaceId: string | null
  userLocation: LatLng | null
  focusLocation?: LatLng | null
}

function MapController({
  focusLocation,
  places,
}: {
  focusLocation?: LatLng | null
  places: CoffeePlace[]
}) {
  const map = useMap()
  const lastSignatureRef = useRef<string | null>(null)
  const hasFramedRef = useRef(false)

  useEffect(() => {
    if (focusLocation) {
      map.flyTo([focusLocation.lat, focusLocation.lng], 14, { duration: 1 })
    }
  }, [focusLocation, map])

  useEffect(() => {
    if (focusLocation || places.length === 0) return
    const signature = places
      .map((p) => p.id)
      .sort()
      .join(',')
    if (signature === lastSignatureRef.current) return
    lastSignatureRef.current = signature

    const bounds = L.latLngBounds(places.map((p) => [p.latitude, p.longitude] as [number, number]))
    map.invalidateSize()
    if (!hasFramedRef.current) {
      hasFramedRef.current = true
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
      // Container layout (fonts, hero content) can still settle just after mount,
      // leaving the very first fit computed against a stale size — re-measure and
      // refit once more on the next frame as a safety net.
      requestAnimationFrame(() => {
        map.invalidateSize()
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
      })
    } else {
      map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 15, duration: 0.6 })
    }
  }, [places, focusLocation, map])

  return null
}

export function MapView({ places, activePlaceId, userLocation, focusLocation }: MapViewProps) {
  const userIcon = useMemo(() => createUserLocationIcon(), [])

  return (
    <MapContainer
      center={MUMBAI_CENTER}
      zoom={10}
      minZoom={9}
      maxZoom={18}
      scrollWheelZoom
      zoomSnap={0.5}
      zoomDelta={1}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController focusLocation={focusLocation} places={places} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}
        maxClusterRadius={50}
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
        animate={false}
        disableClusteringAtZoom={17}
      >
        {places.map((place) => {
          const distanceLabel = userLocation
            ? formatDistance(
                haversineDistanceKm(userLocation, { lat: place.latitude, lng: place.longitude }),
              )
            : undefined

          return (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
              icon={createCoffeeIcon(place.placeType, place.id === activePlaceId)}
            >
              <Popup minWidth={240} maxWidth={260}>
                <MapPreviewCard place={place} distanceLabel={distanceLabel} />
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
