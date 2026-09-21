import { Coffee, MapPin, Heart, Compass } from 'lucide-react'

const points = [
  {
    icon: Compass,
    title: 'Coffee-specific discovery',
    body: 'Filters here are about coffee, not generic business categories — pour-over, cold brew, specialty beans, work-friendly rooms, quiet corners.',
  },
  {
    icon: MapPin,
    title: 'The whole Mumbai region',
    body: 'From Colaba to Borivali, across the harbour to Thane and Navi Mumbai, and out to Mira-Bhayandar, Kalyan-Dombivli and Panvel — every place is placed in a real neighbourhood, so you can actually plan around where you already are.',
  },
  {
    icon: Heart,
    title: 'Your own coffee trail',
    body: 'Save places, mark what you\u2019ve visited, and watch your own map of the city\u2019s coffee scene grow — no account required.',
  },
]

export function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso text-cream">
        <Coffee size={22} />
      </div>
      <h1 className="mt-5 font-display text-[32px] font-semibold leading-tight text-espresso">
        A coffee-first way to find your next cup.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-espresso-soft">
        Bombay Brew Guide is a coffee-first way to discover cafés, roasteries and coffee bars across
        the city. Most maps can tell you what's nearby. This one is built to answer a narrower,
        more useful question: where should you actually go for coffee, and why?
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-espresso-soft">
        Instead of generic star ratings and business categories, every place here is described in
        coffee terms — the styles they brew, what they're best for, and a short, honest note on
        why they're worth a visit. It's meant to feel closer to a curated guide than a search
        result.
      </p>

      <div className="mt-9 flex flex-col gap-5">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-3.5 rounded-2xl border border-line/70 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-dim text-coffee">
              <Icon size={17} />
            </div>
            <div>
              <h3 className="font-display text-[16px] font-semibold text-espresso">{title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-espresso-soft">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 rounded-2xl bg-cream-dim/70 p-5 text-[13.5px] leading-relaxed text-espresso-soft">
        <p>
          <strong className="font-semibold text-espresso">A note on the data:</strong> the places
          in this MVP are real, publicly-known Mumbai cafés, roasteries and coffee counters.
          Names, neighbourhoods and character are drawn from public sources; a place's page shows
          an orange dot and a note when its exact street address hasn't been independently
          confirmed — for those, the neighbourhood is accurate but the address is a best estimate,
          so check before heading out. Places without that note have an address confirmed from an
          official brand page or multiple independent sources. Phone
          numbers, websites, email addresses and Instagram handles are included only where
          confirmed from an official source — a venue's own website or contact page — never
          guessed at from a plausible-looking format.
        </p>
        <p className="mt-3">
          <strong className="font-semibold text-espresso">A note on the photos:</strong> 19 of 181
          places have a confirmed photo of the actual venue, sourced from that specific place's own
          website or from a captioned, geotagged photo of that exact spot — for those, the image is
          a real photograph of the venue itself. For the rest, a place's page marks the image
          "Representative stock photo, not this exact venue": it's stock photography of the
          relevant style of space (roastery, Irani café, specialty coffee bar, etc.), not a
          verified photograph of the venue itself. A chain having a nice photo of one branch isn't
          enough to mark another branch's page verified — each of the 19 was confirmed against that
          specific location.
        </p>
      </div>
    </div>
  )
}
