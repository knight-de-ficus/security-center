"use client";

import withBasePath from "@/utils/with-base-path";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { defaultPersonalInfo } from "./data";
import EditPersonalInfoDialog from "./edit-dialog";
import InfoField from "./info-field";
import SocialLinks from "./social-links";
import { PersonalInfo, PersonalInfoCardProps } from "./types";

export default function PersonalInformationSection({
  data = defaultPersonalInfo,
  className,
}: PersonalInfoCardProps) {
  const t = useTranslations("security.workbench.profile");
  const [profileData, setProfileData] = useState<PersonalInfo>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialLetter = profileData.firstName?.trim()
    ? profileData.firstName.trim()[0].toUpperCase()
    : "M";

  return (
    <>
      <Card columns={12} className={cn("em-profile-section", className)}>
        {/* Top Header Row: Title & Edit Button */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="em-card-title">Personal Information</h2>

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => setIsDialogOpen(true)}
            aria-label={t("editPersonal")}
            className="gap-2"
          >
            <PencilIcon className="size-4.5" />
            <span>Edit</span>
          </Button>
        </div>

        {/* Profile Pic & Basic Meta */}
        <div className="mt-2 flex items-center gap-4 sm:gap-6">
          <Avatar className="size-16 shrink-0 sm:size-20">
            <AvatarImage
              src={
                profileData.avatarUrl || withBasePath("/images/user/owner.png")
              }
              alt={profileData.fullName || "User profile"}
            />
            <AvatarFallback className="em-profile-avatar">
              {initialLetter}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="em-card-title">{profileData.fullName}</h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm dark:text-gray-400">
              <span>{profileData.role}</span>
              <span className="inline-block h-3.5 w-px bg-gray-300 dark:bg-gray-100" />
              <span>{profileData.location}</span>
            </div>
          </div>
        </div>

        {/* Details & Social Links Grid */}
        <div className="em-grid em-nested-grid em-profile-fields">
          <div data-columns={3} className="em-span-3 em-gallery-stack">
            <InfoField label="First Name" value={profileData.firstName} />
            <InfoField label="Email address" value={profileData.email} />
          </div>

          <div data-columns={3} className="em-span-3 em-gallery-stack">
            <InfoField label="Last Name" value={profileData.lastName} />
            <InfoField label="Phone" value={profileData.phone} />
          </div>

          <div data-columns={3} className="em-span-3 em-gallery-stack">
            <InfoField label="Bio" value={profileData.bio} />
          </div>

          <div data-columns={3} className="em-span-3 em-gallery-stack">
            <SocialLinks socialLinks={profileData.socialLinks} />
          </div>
        </div>
      </Card>

      {/* Edit Personal Information Dialog */}
      <EditPersonalInfoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={profileData}
        onSave={setProfileData}
      />
    </>
  );
}
