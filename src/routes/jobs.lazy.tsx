import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/jobs')({
  component: () => <div>Hello /jobs!</div>
})