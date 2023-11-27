import { ChangeEvent } from "react";

export default function SortSelect({ onChange }: { onChange: Function }) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <select
      onChange={handleChange}
      className="bg-blue-700 text-white p-2 border-0"
    >
      <option value="title">Title A to Z</option>
      <option value="-title">Title Z to A</option>
      <option value="created_at">Created (old to new)</option>
      <option value="-created_at">Created (new to old)</option>
      <option value="updated_at">Updated (old to new)</option>
      <option value="-updated_at">Updated (new to old)</option>
    </select>
  );
}
