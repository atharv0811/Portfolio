import { FallbackImage } from "@/components/ui/fallback-image";
import { siteConfig } from "@/data/site-config";
import { publicAssetExists } from "@/lib/assets";

function ProfilePlaceholder() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface-muted">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-radial" />
      <div className="relative flex flex-col items-center gap-4 text-center">
        <span className="grid size-24 place-items-center rounded-2xl border border-border-strong bg-surface font-mono text-2xl font-semibold tracking-tight shadow-soft">
          {siteConfig.initials}
        </span>
        <span className="font-mono text-xs text-subtle-foreground">Add {siteConfig.profileImage}</span>
      </div>
    </div>
  );
}

export function ProfileImage() {
  if (!publicAssetExists(siteConfig.profileImage)) return <ProfilePlaceholder />;
  return (
    <FallbackImage
      src={siteConfig.profileImage}
      alt={`Portrait of ${siteConfig.name}`}
      fill
      sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 100vw"
      className="object-cover"
      fallback={<ProfilePlaceholder />}
    />
  );
}
