import Image from "next/image";
import { cn } from "@/utils";
import withBasePath from "@/utils/with-base-path";
import type { ThemePresetId } from "@/utils/theme-presets";

interface PresetLogoProps {
  preset: ThemePresetId;
  label: string;
}

const logos = {
  default: {
    black: "kdf_black.png",
    white: "kdf_white.png",
    width: 800,
    height: 500,
    heightClass: "h-8",
  },
  tenable: {
    black: "tenable-black.svg",
    white: "tenable-white.svg",
    width: 1480,
    height: 511,
    heightClass: "h-10",
  },
  rapid7: {
    black: "rapid7-black-orange-logo-04-2022.png",
    white: "rapid7-white-orange-logo-04-2022.png",
    width: 890,
    height: 150,
    heightClass: "h-7",
  },
};

export default function PresetLogo({ preset, label }: PresetLogoProps) {
  if (!(preset in logos)) return <strong>{label}</strong>;
  const logo = logos[preset as keyof typeof logos];
  return (
    <span className="em-preset-logo" role="img" aria-label={label}>
      <Image
        src={withBasePath(`/images/brand/${logo.black}`)}
        alt=""
        width={logo.width}
        height={logo.height}
        className={cn(
          "block w-auto max-w-full object-contain dark:hidden",
          logo.heightClass,
        )}
        unoptimized
      />
      <Image
        src={withBasePath(`/images/brand/${logo.white}`)}
        alt=""
        width={logo.width}
        height={logo.height}
        className={cn(
          "hidden w-auto max-w-full object-contain dark:block",
          logo.heightClass,
        )}
        unoptimized
      />
    </span>
  );
}
