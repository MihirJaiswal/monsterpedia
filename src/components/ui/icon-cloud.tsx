"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, ICloud } from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

type DynamicCloudProps = {
  iconSlugs: string[];
};

const loadImage = (slug: string) => `/types/${slug}.png`; // Update path based on your actual folder structure

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Generate image URLs based on iconSlugs
    const imageUrls = iconSlugs.map(loadImage);
    setImages(imageUrls);
  }, [iconSlugs]);

  return (
    <Cloud {...cloudProps}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Icon ${index}`}
          style={{
            width: "42px", // Adjust size as needed
            height: "42px",
            objectFit: "cover",
            margin: "5px", // Adjust spacing as needed
          }}
        />
      ))}
    </Cloud>
  );
}
