import React from "react";
import "./img-skeleton.scss";

type SkeletonProps = {
  ratio?: "sq" | "wd" | "uwd" | "pt";
  radius?: "sm" | "md" | "lg" | "round" | "none";
};

const ImageSkeleton: React.FC<SkeletonProps> = ({
  ratio = "sq",
  radius = "md",
}) => {
  return (
    <div
      className={[
        "sui-image-skeleton",
        `sui-image-skeleton--${ratio}`,
        `sui-image-skeleton--radius-${radius}`,
      ].join(" ")}
    />
  );
};

export default ImageSkeleton;
