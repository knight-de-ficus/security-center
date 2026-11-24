import ComponentCard from "@/components/common/component-card";
import { Video } from "@/components/ui/video";

export default function VideoAspectRatioPreviews() {
  return (
    <div className="em-grid">
      <div data-columns={6} className="em-span-6 em-gallery-stack">
        <ComponentCard columns={12} title="Video Ratio 16:9">
          <Video videoId="dQw4w9WgXcQ" />
        </ComponentCard>
        <ComponentCard columns={12} title="Video Ratio 4:3">
          <Video videoId="dQw4w9WgXcQ" aspectRatio="4:3" />
        </ComponentCard>
      </div>
      <div data-columns={6} className="em-span-6 em-gallery-stack">
        <ComponentCard columns={12} title="Video Ratio 21:9">
          <Video videoId="dQw4w9WgXcQ" aspectRatio="21:9" />
        </ComponentCard>
        <ComponentCard columns={12} title="Video Ratio 1:1">
          <Video videoId="dQw4w9WgXcQ" aspectRatio="1:1" />
        </ComponentCard>
      </div>
    </div>
  );
}
