import { cn } from "@/utils";

export interface SignInHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function SignInHeader({
  title = "Sign In",
  description = "",
  className,
}: SignInHeaderProps) {
  return (
    <div className={cn("mb-5 sm:mb-8", className)}>
      <h1 className="em-page-title">{title}</h1>
      {description && <p className="em-description">{description}</p>}
    </div>
  );
}
