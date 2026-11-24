import withBasePath from "@/utils/with-base-path";
import Image from "next/image";

export default function GridShape() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute end-1 top-0 -z-1 w-full max-w-62.5 xl:max-w-112.5"
      >
        <Image
          width={540}
          height={254}
          src={withBasePath("/images/shape/grid-01.svg")}
          alt="grid"
        />
      </div>
      <div className="absolute inset-s-0 bottom-0 -z-1 w-full max-w-62.5 rotate-180 xl:max-w-112.5">
        <Image
          width={540}
          height={254}
          src={withBasePath("/images/shape/grid-01.svg")}
          alt="grid"
        />
      </div>
    </>
  );
}
