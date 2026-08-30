import Image from "next/image";
import type { GalleryImage } from "@/content/projects/types";

const aspectClass: Record<GalleryImage["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/9] md:col-span-2",
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((img, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl bg-mist ${aspectClass[img.aspect]}`}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
