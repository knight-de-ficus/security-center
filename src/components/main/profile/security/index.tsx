"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PencilIcon } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";
import ChangePasswordModal from "./change-password-modal";
import { defaultSecuritySettings } from "./data";
import SecurityItem from "./security-item";
import type { ChangePasswordFormData, SecurityProps } from "./types";

export default function SecuritySection({
  initialSettings = defaultSecuritySettings,
  className,
  onPasswordChange,
  onTwoFactorChange,
}: SecurityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    initialSettings.twoFactorEnabled,
  );

  const handleTwoFactorChange = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    onTwoFactorChange?.(checked);
  };

  const handlePasswordSubmit = (data: ChangePasswordFormData) => {
    onPasswordChange?.(data);
  };

  return (
    <>
      <Card columns={12} className={cn("em-profile-section", className)}>
        <h4 className="em-card-title">Security</h4>

        <div className="mt-1">
          <SecurityItem
            title="Change Password"
            description="Update the password used to sign in."
            hasDivider
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="gap-2"
              >
                <PencilIcon className="size-5" />
                <span>Change Password</span>
              </Button>
            }
          />

          <SecurityItem
            title="Two-factor authentication (2FA)"
            description="Keep your account secure by enabling 2FA"
            action={
              <Switch
                size="default"
                checked={twoFactorEnabled}
                onCheckedChange={handleTwoFactorChange}
                aria-label="Toggle two-factor authentication"
              />
            }
          />
        </div>
      </Card>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmitSuccess={handlePasswordSubmit}
      />
    </>
  );
}
