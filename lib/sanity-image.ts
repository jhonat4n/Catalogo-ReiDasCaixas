import { dataset, projectId } from "@/sanity/env";

export function urlForImage(source: unknown) {
  const ref = (source as { asset?: { _ref?: string } })?.asset?._ref;
  if (!ref) return { url: () => undefined };
  const match = ref.match(/^image-(.+)-(\d+x\d+)-(\w+)$/);
  if (!match) return { url: () => undefined };
  const [, id, dimensions, format] = match;
  return { url: () => `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}` };
}
