import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/notfound')({
  component: () => <div>404 Page Not Found!</div>
})