// app/blog/[slug]/EditButton.tsx
"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  slug: string;
}

export function EditButton({ slug }: EditButtonProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/blog/edit/${slug}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8a0038] hover:bg-[#6d002d] dark:bg-[#ff6b9d] dark:hover:bg-[#ff4d88] text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
    >
      <Pencil className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="hidden sm:inline">Edit Post</span>
    </button>
  );
}