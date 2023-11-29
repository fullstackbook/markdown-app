"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function SortSelectServer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(e: ChangeEvent<HTMLSelectElement>) {
    console.log(`sorting ${e.target.value}`);
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select onChange={handleSort} className="bg-blue-700 text-white p-2">
      <option value="title">Title A to Z</option>
      <option value="-title">Title Z to A</option>
      <option value="created_at">Created (old to new)</option>
      <option value="-created_at">Created (new to old)</option>
      <option value="updated_at">Updated (old to new)</option>
      <option value="-updated_at">Updated (new to old)</option>
    </select>
  );
}
