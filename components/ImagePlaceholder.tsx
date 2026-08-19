import Image, { type StaticImageData } from "next/image";
import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  image?: string | StaticImageData;
  alt?: string;
  text?: string;
  className?: string;
  sizes?: string;
};

export default function ImagePlaceholder({
  image,
  alt = "Imagem ilustrativa de produto ou ambiente da Rei das Caixas",
  text = "Foto em breve",
  className = "",
  sizes = "100vw",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl ${
        image ? "bg-creme" : "border-2 border-dashed border-[#c7a77e] bg-[#ead8c2]"
      } ${className}`}
    >
      {image ? (
        <Image src={image} alt={alt} fill className="object-cover" sizes={sizes} />
      ) : (
        <div role="img" aria-label={`${alt}: ${text}`} className="flex flex-col items-center gap-3 px-4 text-center text-marrom-escuro/80">
          <ImageIcon aria-hidden="true" className="h-10 w-10" strokeWidth={1.5} />
          <span className="text-sm font-medium">{text}</span>
        </div>
      )}
    </div>
  );
}
