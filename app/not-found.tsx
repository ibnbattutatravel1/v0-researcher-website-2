export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-3 p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground max-w-prose">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <a href="/" className="underline text-accent hover:opacity-90">
        Go back home
      </a>
    </div>
  )
}
