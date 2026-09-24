import React, { useEffect, useState } from "react";
import ImageSkeleton from "./ImageSkeleton";
import "./image.scss";

type Ratio = "sq" | "wd" | "uwd" | "pt";
type Fit = "cover" | "contain";
type Radius = "sm" | "md" | "lg" | "round" | "none";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  ratio?: Ratio;
  fit?: Fit;
  radius?: Radius;
  fallback?: React.ReactNode;
  showSkeleton?: boolean;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  ratio = "sq",
  fit = "cover",
  radius = "md",
  fallback,
  showSkeleton = true,
  className,
  onLoad,
  onError,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    setLoaded(true);
    onError?.(e);
  };

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div
      className={[
        "sui-image-wrapper",
        `sui-image-wrapper--${ratio}`,
        `sui-image-wrapper--radius-${radius}`,
        className || "",
      ]
        .join(" ")
        .trim()}
    >
      {(!src || (!loaded && !error && showSkeleton)) && (
        <ImageSkeleton ratio={ratio} radius={radius} />
      )}

      {/* IMAGE */}
      {!error && src && (
        <img
          {...rest}
          src={src}
          alt={alt}
          loading={rest.loading ?? "lazy"}
          className={[
            "sui-image",
            `sui-image--${fit}`,
            loaded ? "sui-image--loaded" : "sui-image--loading",
          ]
            .join(" ")
            .trim()}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* FALLBACK */}
      {error && src && (
        <div className="sui-image-fallback">
          {fallback || "Image not available"}
        </div>
      )}
    </div>
  );
};

export default Image;
