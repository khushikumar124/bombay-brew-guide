import L from 'leaflet'
import type { PlaceType } from '../../types/coffee'

// Color-coded by place type so the map reads at a glance, not just a field of
// identical pins. Kept in sync with <MapLegend />.
export const PLACE_TYPE_COLORS: Record<PlaceType, string> = {
  Cafe: '#A9713F', // coffee
  Roastery: '#2FD1BE', // mint
  Takeaway: '#E39187', // clay
  'Coffee Bar': '#FF6B9E', // berry
}

const ACTIVE_COLOR = '#FFC93C' // gold
const USER_COLOR = '#4FC2F0' // sky
const CREAM = '#FFF8EF'

export function createCoffeeIcon(placeType: PlaceType, active: boolean): L.DivIcon {
  const color = active ? ACTIVE_COLOR : PLACE_TYPE_COLORS[placeType]
  const size = active ? 52 : 42
  return L.divIcon({
    className: 'coffee-marker marker-drop',
    html: `
      <div style="position:relative;width:${size}px;height:${size + 10}px;">
        <svg style="position:absolute;top:-14px;left:${size / 2 - 5}px;" width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path class="steam-wisp" d="M5 14C5 14 1 10.5 5 7C9 3.5 5 1 5 1" stroke="${color}" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.8"/>
        </svg>
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1.5C8.8 1.5 3.2 7 3.2 13.6C3.2 22.8 16 31.5 16 31.5C16 31.5 28.8 22.8 28.8 13.6C28.8 7 23.2 1.5 16 1.5Z" fill="${color}" stroke="${CREAM}" stroke-width="2.25"/>
          <circle cx="10.5" cy="9" r="2" fill="${CREAM}" opacity="0.5" />
          <path d="M10.5 13.5C10.5 12.1 11.6 11 13 11H19C20.4 11 21.5 12.1 21.5 13.5V15C21.5 17.8 19 20.2 16 20.2C13 20.2 10.5 17.8 10.5 15V13.5Z" fill="${CREAM}"/>
          <path d="M21.5 13.5H22.3C23.1 13.5 23.8 14.2 23.8 15C23.8 15.8 23.1 16.5 22.3 16.5H21.5" stroke="${CREAM}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    `,
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  })
}

export function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: 'user-location-marker gentle-bob',
    html: `
      <div style="width:22px;height:22px;border-radius:9999px;background:${USER_COLOR};border:3px solid ${CREAM};box-shadow:0 0 0 7px rgba(79,194,240,0.3);"></div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}
