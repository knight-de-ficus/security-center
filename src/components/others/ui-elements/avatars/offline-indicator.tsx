import withBasePath from "@/utils/with-base-path";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function OfflineIndicator() {
  return (
    <div className="flex flex-col items-center justify-start gap-5 sm:flex-row">
      <Avatar size="xs">
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
        <AvatarBadge variant="offline" />
      </Avatar>
      <Avatar size="sm">
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
        <AvatarBadge variant="offline" />
      </Avatar>
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
        <AvatarBadge variant="offline" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
        <AvatarBadge variant="offline" />
      </Avatar>
      <Avatar size="xl">
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
        <AvatarBadge variant="offline" />
      </Avatar>
    </div>
  );
}
