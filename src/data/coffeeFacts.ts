export const COFFEE_FACTS: string[] = [
  'India is one of the few countries where coffee is traditionally grown in the shade, under rainforest canopy.',
  'South Indian filter kaapi is brewed through a two-chamber steel filter, no paper required.',
  "Karnataka's Chikmagalur region is often credited as the birthplace of coffee cultivation in India.",
  'A pour-over and a drip coffee use a similar principle, but pour-over gives you control over every second.',
  'Cold brew is steeped for hours, not brewed hot and chilled — that\u2019s what gives it a smoother, less acidic taste.',
  'Mumbai\u2019s Irani cafés were serving coffee alongside bun-maska decades before "specialty coffee" was a phrase.',
  'Espresso means "pressed out" in Italian — water is forced through finely-ground coffee under pressure.',
  'Robusta plants handle heat and altitude better than Arabica, which is part of why India grows both.',
]

export function getRandomFact(exclude?: string): string {
  const options = COFFEE_FACTS.filter((f) => f !== exclude)
  return options[Math.floor(Math.random() * options.length)] ?? COFFEE_FACTS[0]
}
