import React from "react";

export interface Attribute {
  trait_type: string;
  value: string;
}
interface ImageCardProps {
  name: string;
  image: string;
  attributes: Attribute[];
}

export const ImageCard = ({ name, image, attributes }: ImageCardProps) => (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <img src={image} alt="Fintechie" />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontFamily: "Lexend",
        }}
      >
        {name}
      </div>
      {attributes.map((attribute, index) => (
        <div
          key={index}
          style={{
            fontSize: "1.5rem",
            fontFamily: "Lexend",
            marginTop: "1rem",
          }}
        >
          {`${attribute.trait_type} : ${attribute.value} `}
        </div>
      ))}
    </div>
  </div>
);

interface ImageGalleryProps {
  data: { name: string; image_data: string; attributes: Attribute[] }[];
}

export const ImageGallery = ({ data }: ImageGalleryProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      alignItems: "center",
    }}
  >
    {data.map((item, index) => (
      <ImageCard
        key={index}
        name={item.name}
        image={item.image_data}
        attributes={item.attributes}
      />
    ))}
  </div>
);
