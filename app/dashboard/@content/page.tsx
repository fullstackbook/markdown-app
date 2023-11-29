"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(searchParams);
    const note_id = searchParams.get("note_id");
    console.log("content container", note_id);
  }, [searchParams]);

  return <div>content</div>;
}
