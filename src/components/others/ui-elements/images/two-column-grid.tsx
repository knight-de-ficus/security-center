import withBasePath from "@/utils/with-base-path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function TwoColumnImageGrid() {
  const t = await getTranslations("security.workbench.media");
  return (
    <div className="em-grid">
      <div data-columns={6} className="em-span-6">
        <Image
          src={withBasePath("/images/grid-image/image-02.png")}
          alt={t("image2")}
          className="em-media"
          width={517}
          height={295}
        />
      </div>

      <div data-columns={6} className="em-span-6">
        <Image
          src={withBasePath("/images/grid-image/image-03.png")}
          alt={t("image3")}
          className="em-media"
          width={517}
          height={295}
        />
      </div>
    </div>
  );
}
