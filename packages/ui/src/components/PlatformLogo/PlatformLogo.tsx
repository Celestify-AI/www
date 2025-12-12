import Image from "next/image";

interface PlatformLogoProps {
  platform: string;
  className?: string;
  width?: number;
  height?: number;
}

const PlatformLogo = ({
  platform,
  className,
  width = 64,
  height = 64,
}: PlatformLogoProps) => {
  const src = `/app/logos/${platform}.svg`;

  return (
    <Image
      src={src}
      alt={`${platform} logo`}
      width={width}
      height={height}
      className={className}
    />
  );
};

export { PlatformLogo };
