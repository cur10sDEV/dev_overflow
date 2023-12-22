"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  route: string;
  icon: string;
  iconPosition: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  icon,
  iconPosition,
  placeholder,
  otherClasses,
}: Props) => {
  return (
    <div
      className={`${otherClasses} background-light800_darkgradient relative flex min-h-[56px] flex-1 grow items-center gap-4 rounded-[10px] px-4`}
    >
      {iconPosition === "left" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none focus:border-none"
        onChange={() => {}}
      />
      {iconPosition === "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};
export default LocalSearchBar;
