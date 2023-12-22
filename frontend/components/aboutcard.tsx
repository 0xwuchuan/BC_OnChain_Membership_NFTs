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

export default function AboutCard({
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
        "bg-opacity-50 rounded-3xl",
        "relative hover:bg-opacity-65",
        "transition duration-500 ease-in-out transform hover:-translate-y-1",
        "hover: scale - 110"
      )}
    >
      <Image
        className="absolute right-8 bottom-9 opacity-10 -rotate-12"
        src={image}
        alt={imageAlt}
        width={150}
        height={100}
      />
      <div className="pt-6 px-8">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="pt-2 max-w-[50%]">{description}</p>
      </div>
    </div>
  );
}
