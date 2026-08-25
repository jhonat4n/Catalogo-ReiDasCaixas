export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Carregando produtos" aria-busy="true">{Array.from({ length: count }, (_, index) => <article key={index} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-dourado/30"><div className="aspect-[4/3] animate-pulse bg-[#ead8c2]" /><div className="space-y-3 p-5"><div className="h-3 w-1/3 animate-pulse rounded bg-[#ead8c2]" /><div className="h-6 w-4/5 animate-pulse rounded bg-[#ead8c2]" /><div className="h-10 w-full animate-pulse rounded bg-[#ead8c2]" /></div></article>)}</div>;
}

