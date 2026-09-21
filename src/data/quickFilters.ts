import type { CoffeeStyle, ExperienceTag, PlaceType } from '../types/coffee'

export type QuickFilterKey =
  | { field: 'coffeeStyles'; value: CoffeeStyle }
  | { field: 'placeTypes'; value: PlaceType }
  | { field: 'experience'; value: ExperienceTag }
  | { field: 'openNow' }

export type ChipColor = 'clay' | 'mint' | 'sky' | 'berry' | 'gold' | 'sage' | 'plum'

export interface QuickFilterDef {
  label: string
  key: QuickFilterKey
  color: ChipColor
}

export const QUICK_FILTERS: QuickFilterDef[] = [
  { label: 'Specialty', key: { field: 'coffeeStyles', value: 'Specialty Coffee' }, color: 'clay' },
  { label: 'Espresso', key: { field: 'coffeeStyles', value: 'Espresso' }, color: 'plum' },
  { label: 'Pour-over', key: { field: 'coffeeStyles', value: 'Pour-over' }, color: 'sky' },
  { label: 'Work friendly', key: { field: 'experience', value: 'Work Friendly' }, color: 'mint' },
  { label: 'Date spot', key: { field: 'experience', value: 'Date Spot' }, color: 'berry' },
  { label: 'Takeaway', key: { field: 'placeTypes', value: 'Takeaway' }, color: 'gold' },
  { label: 'Roastery', key: { field: 'placeTypes', value: 'Roastery' }, color: 'mint' },
  { label: 'Open now', key: { field: 'openNow' }, color: 'sage' },
]
