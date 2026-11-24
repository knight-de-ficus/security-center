"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "@/icons";
import { useState } from "react";
import { useTranslations } from "next-intl";
import AddressItem from "./address-item";
import { defaultAddressData } from "./data";
import EditAddressModal from "./edit-address-modal";
import { AddressData } from "./types";

export default function AddressSection() {
  const t = useTranslations("security.workbench.profile");
  const [address, setAddress] = useState<AddressData>(defaultAddressData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedData: AddressData) => {
    setAddress(updatedData);
  };

  return (
    <>
      <Card columns={12}>
        <div className="flex flex-col gap-6 sm:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h4 className="em-card-title">Address</h4>

            <div className="em-grid em-nested-grid em-profile-fields">
              <AddressItem label="Country" value={address.country} />
              <AddressItem label="City/State" value={address.cityState} />
              <AddressItem label="Postal Code" value={address.postalCode} />
              <AddressItem label="TAX ID" value={address.taxId} />
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              aria-label={t("editAddress")}
              className="w-full lg:w-auto"
            >
              <PencilIcon className="size-5" />
              Edit
            </Button>
          </div>
        </div>
      </Card>

      <EditAddressModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={address}
        onSave={handleSave}
      />
    </>
  );
}
