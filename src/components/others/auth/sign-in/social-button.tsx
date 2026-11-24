"use client";

import { cn } from "@/utils";
import { socialProviders } from "./data";
import { SocialAuthProvider } from "./types";

export interface SocialButtonProps {
  provider: SocialAuthProvider;
  onClick?: () => void;
  className?: string;
}

export default function SocialButton({
  provider,
  onClick,
  className,
}: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "em-button em-button-outline em-control-default",
        className,
      )}
    >
      {provider.icon}
      Sign in with {provider.name}
    </button>
  );
}

export interface SocialButtonsProps {
  providers?: SocialAuthProvider[];
  className?: string;
  onSelectProvider?: (providerId: string) => void;
}

export function SocialButtons({
  providers = socialProviders,
  className,
  onSelectProvider,
}: SocialButtonsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5",
        className,
      )}
    >
      {providers.map((provider) => (
        <SocialButton
          key={provider.id}
          provider={provider}
          onClick={
            onSelectProvider ? () => onSelectProvider(provider.id) : undefined
          }
        />
      ))}
    </div>
  );
}
