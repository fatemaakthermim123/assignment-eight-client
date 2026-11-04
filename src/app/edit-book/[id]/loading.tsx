const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-14 flex flex-col items-center gap-3">
        <div className="h-12 w-56 animate-pulse rounded-xl bg-muted" />
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
};

export default Loading;