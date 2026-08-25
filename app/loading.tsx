import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><section className="grid gap-12 lg:grid-cols-2"><div className="space-y-5"><div className="h-8 w-64 animate-pulse rounded-full bg-[#ead8c2]" /><div className="h-20 w-full animate-pulse rounded bg-[#ead8c2]" /><div className="h-16 w-4/5 animate-pulse rounded bg-[#ead8c2]" /></div><div className="min-h-[280px] animate-pulse rounded-2xl bg-[#ead8c2]" /></section><section className="mt-14"><div className="mb-6 h-8 w-64 animate-pulse rounded bg-[#ead8c2]" /><ProductGridSkeleton count={3} /></section></main>;
}

