import Image from "next/image";
import { cn } from "../lib/utils";

interface AboutCardProps {
  colSpan: string;
  bgColor: string;
  title: string;
  description: string;
  image: any;
  imageAlt: string;
}

export function AboutCard({
  colSpan,
  bgColor,
  title,
  description,
  image,
  imageAlt,
}: AboutCardProps) {
  return (
    <div
      className={cn(
        colSpan,
        bgColor,
        "min-h-[200px] rounded-3xl bg-opacity-50",
        "relative hover:bg-opacity-65",
        "transform transition duration-300 ease-in-out hover:-translate-y-1",
        "hover:shadow-lg",
      )}
    >
      <Image
        className="absolute bottom-8 right-8 rotate-12 opacity-5"
        src={image}
        alt={imageAlt}
        width={150}
        height={100}
      />
      <div className="px-8 pt-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-full pt-2 md:max-w-[65%]">{description}</p>
      </div>
    </div>
  );
}
