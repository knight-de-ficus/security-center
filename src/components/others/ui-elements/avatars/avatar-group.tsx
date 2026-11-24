import withBasePath from "@/utils/with-base-path";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarGroupPreview() {
  return (
    <AvatarGroup className="w-fit">
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-01.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-02.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-03.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-04.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={withBasePath("/images/user/user-05.jpg")}
          alt="user one"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>2+</AvatarGroupCount>
    </AvatarGroup>
  );
}
