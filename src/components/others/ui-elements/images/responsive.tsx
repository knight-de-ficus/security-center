import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function ResponsiveImage() {
  const t = await getTranslations("security.workbench.media");
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <Image
          src="/images/grid-image/image-01.png"
          alt={t("image1")}
          className="em-media"
          width={1054}
          height={600}
        />
      </div>
    </div>
  );
}
