import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-5 py-20">
      <EmptyState
        title="This page wandered off"
        description="The page you're looking for doesn't exist. Let's get you back to the map."
        action={
          <Link to="/" className="tap-bounce inline-block rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream">
            Back to Explore
          </Link>
        }
      />
    </div>
  )
}
