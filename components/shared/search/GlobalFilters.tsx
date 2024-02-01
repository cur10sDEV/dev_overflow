"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {}
const GlobalFilters = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (value: string) => {
    if (active === value) {
      setActive("");
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(value);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: value.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            key={item.value}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500 ${
              active === item.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
            }`}
            type="button"
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default GlobalFilters;
