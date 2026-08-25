import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function CatalogoLoading() {
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><div className="h-4 w-24 animate-pulse rounded bg-[#ead8c2]" /><div className="mt-4 h-12 w-2/3 animate-pulse rounded bg-[#ead8c2]" /><div className="mt-8 h-24 animate-pulse rounded-2xl bg-white ring-1 ring-dourado/30" /><div className="my-8 h-4 w-48 animate-pulse rounded bg-[#ead8c2]" /><ProductGridSkeleton /></main>;
}

