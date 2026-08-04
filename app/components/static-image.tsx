import type { CSSProperties, ImgHTMLAttributes } from "react";

type StaticImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

export function StaticImage({
  alt,
  fill = false,
  height,
  priority = false,
  sizes,
  src,
  style,
  width,
  ...props
}: StaticImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? {
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
        ...style,
      }
    : style;

  return (
    // Vinext's development image optimizer currently crashes on local assets.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      src={src}
      style={fillStyle}
      width={fill ? undefined : width}
    />
  );
}
