export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="container-page pb-24 pt-[calc(var(--header-height)+4rem)] motion-safe:animate-pulse"
    >
      <div className="h-3 w-28 rounded-full bg-surface-muted" />
      <div className="mt-6 h-12 w-full max-w-2xl rounded-lg bg-surface-muted" />
      <div className="mt-3 h-12 w-2/3 max-w-xl rounded-lg bg-surface-muted" />
      <div className="mt-8 h-4 w-full max-w-lg rounded-full bg-surface-muted" />
      <div className="mt-14 aspect-[16/9] w-full rounded-2xl bg-surface-muted" />
    </div>
  );
}
