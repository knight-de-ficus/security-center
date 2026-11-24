import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function ThreeColumnImageGrid() {
  const t = await getTranslations("security.workbench.media");
  return (
    <div className="em-grid">
      <div data-columns={4} className="em-span-4">
        <Image
          src="/images/grid-image/image-04.png"
          alt={t("image4")}
          className="em-media"
          width={338}
          height={192}
        />
      </div>

      <div data-columns={4} className="em-span-4">
        <Image
          src="/images/grid-image/image-05.png"
          alt={t("image5")}
          className="em-media"
          width={338}
          height={192}
        />
      </div>

      <div data-columns={4} className="em-span-4">
        <Image
          src="/images/grid-image/image-06.png"
          alt={t("image6")}
          className="em-media"
          width={338}
          height={192}
        />
      </div>
    </div>
  );
}
